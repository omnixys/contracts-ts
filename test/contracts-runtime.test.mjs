import {
  ContractSchemaNotFoundError,
  ContractSchemaRegistry,
  ERROR_CODES,
  ErrorCode,
  EventClosedException,
  FrameworkException,
  getErrorDefinition,
  getPublicErrorMetadata,
  InvitationAlreadyApprovedException,
  NotificationChannelUnavailableException,
  SeatAlreadyReservedException,
  TicketAlreadyScannedException,
  UserNotFoundException,
  contractEnvelopeSchema,
  createPendingUserSchema,
  guestAuthKeySchema,
  guestNotificationSchema,
  guestSignUpTokenPayloadSchema,
  isErrorCode,
} from "../dist/index.js";
import assert from "node:assert/strict";
import test from "node:test";
import { z } from "zod";

const ids = {
  actorId: "00000000-0000-4000-8000-000000000001",
  eventId: "00000000-0000-4000-8000-000000000002",
  invitationId: "00000000-0000-4000-8000-000000000003",
  tenantId: "00000000-0000-4000-8000-000000000004",
};

test("canonical error codes are stable and discoverable", () => {
  assert.equal(ErrorCode.USER_NOT_FOUND, "USER_NOT_FOUND");
  assert.equal(ErrorCode.REFRESH_TOKEN_EXPIRED, "REFRESH_TOKEN_EXPIRED");
  assert.equal(ErrorCode.SERVICE_UNAVAILABLE, "SERVICE_UNAVAILABLE");
  assert.ok(ERROR_CODES.includes(ErrorCode.SEAT_OCCUPIED));
  assert.equal(isErrorCode("TICKET_REVOKED"), true);
  assert.equal(isErrorCode("Ticket was revoked"), false);
});

test("user schemas validate and normalize contract dates", () => {
  const pending = createPendingUserSchema.parse({
    ...ids,
    firstName: "Ada",
    lastName: "Lovelace",
    locale: "en-US",
    eventEndsAt: "2030-01-01T12:00:00.000Z",
  });
  assert.ok(pending.eventEndsAt instanceof Date);

  const auth = guestAuthKeySchema.parse({
    actorId: ids.actorId,
    tenantId: ids.tenantId,
    invitees: [
      {
        invitationId: ids.invitationId,
        firstName: "Ada",
        lastName: "Lovelace",
      },
    ],
    eventEndsAt: new Date("2030-01-01T12:00:00.000Z"),
  });
  assert.ok(auth.eventEndsAt instanceof Date);

  assert.ok(
    guestNotificationSchema.parse({
      token: "token",
      eventName: "Launch",
      eventEndsAt: "2030-01-01T12:00:00.000Z",
    }).eventEndsAt instanceof Date,
  );
  assert.ok(
    guestSignUpTokenPayloadSchema.parse({
      authKey: "auth",
      userKey: "user",
      eventKey: "event",
      seatKey: "seat",
      eventEndAt: "2030-01-01T12:00:00.000Z",
    }).eventEndAt instanceof Date,
  );
});

test("schema registry enforces explicit versions and validates envelopes", () => {
  const registry = new ContractSchemaRegistry();
  const schema = contractEnvelopeSchema(
    z.object({ userId: z.string().uuid() }),
  );
  registry.register("user.deleted", "1.0", schema);
  const parsed = registry.parse("user.deleted", "1.0", {
    schemaVersion: "1.0",
    occurredAt: "2030-01-01T12:00:00.000Z",
    metadata: {
      requestId: "request-1",
      correlationId: "correlation-1",
    },
    payload: { userId: ids.actorId },
  });
  assert.equal(parsed.payload.userId, ids.actorId);
  assert.deepEqual(registry.diagnostics(), { schemas: ["user.deleted@1.0"] });
  assert.throws(
    () => registry.parse("user.deleted", "2.0", {}),
    ContractSchemaNotFoundError,
  );
});

test("framework exceptions are transport-neutral and diagnostically stable", () => {
  const errors = [
    new UserNotFoundException(ids.actorId),
    new EventClosedException(ids.eventId),
    new SeatAlreadyReservedException("seat-1"),
    new InvitationAlreadyApprovedException(ids.invitationId),
    new TicketAlreadyScannedException("ticket-1"),
    new NotificationChannelUnavailableException("whatsapp"),
  ];

  for (const error of errors) {
    assert.ok(error instanceof FrameworkException);
    assert.equal(typeof error.code, "string");
    assert.equal(error.requestId, "unscoped");
    assert.equal(error.correlationId, "unscoped");
    assert.equal(Object.isFrozen(error.metadata), true);
  }

  const contextual = new UserNotFoundException(ids.actorId, {
    context: {
      requestId: "request-2",
      correlationId: "correlation-2",
      actorId: ids.actorId,
    },
  });
  assert.equal(contextual.requestId, "request-2");
  assert.equal(contextual.correlationId, "correlation-2");
  assert.equal(contextual.actorId, ids.actorId);
  assert.equal(contextual.httpStatus, 404);
  assert.equal(contextual.retryable, false);
  assert.equal(contextual.summary, "User not found.");
});

test("framework diagnostics and causes remain server-only", () => {
  const cause = new Error("database password leaked");
  const error = new FrameworkException(
    ErrorCode.IDENTITY_PROVIDER_CLIENT_CONFIGURATION_INVALID,
    "Authentication is temporarily unavailable.",
    {
      cause,
      metadata: { field: "client", password: "must-not-leak" },
      diagnostics: { clientSecret: "must-not-leak", upstreamStatus: 401 },
    },
  );

  assert.equal(error.httpStatus, 500);
  assert.equal(error.retryable, false);
  assert.equal(Object.prototype.propertyIsEnumerable.call(error, "diagnostics"), false);
  assert.equal(JSON.stringify(error).includes("must-not-leak"), false);
  assert.equal(JSON.stringify(error).includes("upstreamStatus"), false);
  assert.equal(error.cause, cause);
});

test("public metadata is controlled by the error-code allowlist", () => {
  assert.deepEqual(
    getPublicErrorMetadata(ErrorCode.USER_NOT_FOUND, {
      userId: ids.actorId,
      sql: "select *",
      password: "must-not-leak",
    }),
    { userId: ids.actorId },
  );
  assert.deepEqual(
    getPublicErrorMetadata(ErrorCode.INVALID_CREDENTIALS, {
      username: "user@example.com",
    }),
    {},
  );
  assert.equal(
    getErrorDefinition(ErrorCode.IDENTITY_PROVIDER_UNAVAILABLE).retryable,
    true,
  );
});

test("invitation RSVP and seat errors expose safe client-visible status", () => {
  assert.equal(getErrorDefinition(ErrorCode.RSVP_NOT_SUBMITTED).httpStatus, 422);
  assert.equal(getErrorDefinition(ErrorCode.RSVP_NOT_ACCEPTED).httpStatus, 422);
  assert.equal(
    getErrorDefinition(ErrorCode.INVITATION_PREVIEW_FAILED).httpStatus,
    422,
  );
  assert.equal(
    getErrorDefinition(ErrorCode.SEAT_ALLOCATION_EXCEEDED).httpStatus,
    400,
  );
  assert.equal(
    getErrorDefinition(ErrorCode.RSVP_NOT_SUBMITTED).defaultMessage,
    "Guest has not submitted an RSVP yet.",
  );
  assert.deepEqual(
    getPublicErrorMetadata(ErrorCode.RSVP_NOT_SUBMITTED, {
      invitationId: ids.invitationId,
      secret: "must-not-leak",
      causeDetail: "nope",
    }),
    { invitationId: ids.invitationId },
  );
});

test("guest sign-up failure is a retryable availability error with a safe reason", () => {
  const definition = getErrorDefinition(ErrorCode.GUEST_SIGNUP_FAILED);
  assert.equal(definition.httpStatus, 503);
  assert.equal(definition.retryable, true);
  assert.equal(definition.summary, "Guest sign-up could not be completed.");
  assert.equal(
    definition.defaultMessage,
    "Your guest sign-up could not be completed. Please try again.",
  );
  assert.deepEqual(
    getPublicErrorMetadata(ErrorCode.GUEST_SIGNUP_FAILED, {
      reason: "provisioning-incomplete",
      upstreamStatus: "must-not-leak",
      password: "must-not-leak",
    }),
    { reason: "provisioning-incomplete" },
  );
});
