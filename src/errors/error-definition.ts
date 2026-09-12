import { ErrorCode } from "./error-code.enum.js";

export interface ErrorDefinition {
  readonly code: string;
  readonly summary: string;
  readonly defaultMessage: string;
  readonly httpStatus: number;
  readonly retryable: boolean;
  readonly publicMetadataKeys: readonly string[];
}

/** Increment only when the public error contract changes incompatibly. */
export const ERROR_CATALOG_VERSION = "1.1.0";

type DefinitionInput = Omit<ErrorDefinition, "code" | "publicMetadataKeys">;

const publicMetadataKeys: Readonly<
  Partial<Record<ErrorCode, readonly string[]>>
> = Object.freeze({
  [ErrorCode.VALIDATION_ERROR]: ["field", "fields", "constraint"],
  [ErrorCode.AUTHENTICATION_INPUT_INVALID]: ["field", "fields"],
  [ErrorCode.AUTHENTICATION_PASSWORD_POLICY]: ["field"],
  [ErrorCode.AUTHENTICATION_USER_ALREADY_EXISTS]: ["field"],
  [ErrorCode.USER_NOT_FOUND]: ["userId", "identifier"],
  [ErrorCode.USER_ALREADY_EXISTS]: ["field"],
  [ErrorCode.USERNAME_ALREADY_EXISTS]: ["field"],
  [ErrorCode.USER_EMAIL_ALREADY_EXISTS]: ["field"],
  [ErrorCode.EVENT_NOT_FOUND]: ["eventId"],
  [ErrorCode.EVENT_CLOSED]: ["eventId"],
  [ErrorCode.EVENT_ACCESS_DENIED]: ["eventId"],
  [ErrorCode.EVENT_MEMBER_NOT_FOUND]: ["eventId", "userId"],
  [ErrorCode.EVENT_TIMELINE_NOT_FOUND]: ["eventId", "timelineIds"],
  [ErrorCode.EVENT_MEDIA_NOT_FOUND]: ["mediaId"],
  [ErrorCode.EVENT_MEDIA_VARIANT_NOT_FOUND]: ["mediaId"],
  [ErrorCode.SEAT_NOT_FOUND]: ["seatId"],
  [ErrorCode.SEAT_OCCUPIED]: ["seatId", "sectionId"],
  [ErrorCode.SEAT_ALREADY_RESERVED]: ["seatId"],
  [ErrorCode.SEAT_CAPACITY_EXCEEDED]: ["sectionId", "capacity", "requested"],
  [ErrorCode.SEAT_ASSIGNMENT_NOT_FOUND]: ["seatId", "userId"],
  [ErrorCode.SECTION_NOT_FOUND]: ["sectionId"],
  [ErrorCode.TABLE_NOT_FOUND]: ["tableId"],
  [ErrorCode.LAYOUT_VERSION_NOT_FOUND]: ["layoutVersionId"],
  [ErrorCode.INVITATION_NOT_FOUND]: ["invitationId"],
  [ErrorCode.INVITATION_LIMIT_REACHED]: ["eventId", "limit"],
  [ErrorCode.TICKET_NOT_FOUND]: ["ticketId"],
  [ErrorCode.TICKET_ALREADY_SCANNED]: ["ticketId"],
  [ErrorCode.TICKET_ALREADY_REDEEMED]: ["ticketId"],
  [ErrorCode.NOTIFICATION_NOT_FOUND]: ["notificationId"],
  [ErrorCode.NOTIFICATION_CHANNEL_UNAVAILABLE]: ["channel"],
  [ErrorCode.TEMPLATE_NOT_FOUND]: ["templateId", "key"],
  [ErrorCode.SHOPPING_CART_NOT_FOUND]: ["shoppingCartId"],
  [ErrorCode.SHOPPING_CART_ITEM_NOT_FOUND]: ["shoppingCartId", "inventoryId"],
  [ErrorCode.SHOPPING_CART_QUANTITY_INVALID]: ["field", "minimum"],
  [ErrorCode.RSVP_NOT_SUBMITTED]: ["invitationId"],
  [ErrorCode.RSVP_NOT_ACCEPTED]: ["invitationId"],
  [ErrorCode.INVITATION_PREVIEW_FAILED]: ["eventId"],
  [ErrorCode.SEAT_ALLOCATION_EXCEEDED]: ["eventId", "sectionId", "capacity", "requested"],
  [ErrorCode.TENANT_HEADER_MISSING]: ["tenantId"],
  [ErrorCode.TENANT_HEADER_INVALID]: ["tenantId"],
  [ErrorCode.TENANT_NOT_FOUND]: ["tenantId"],
  [ErrorCode.TENANT_DISABLED]: ["tenantId", "status"],
  [ErrorCode.TENANT_MEMBERSHIP_NOT_FOUND]: ["tenantId", "userId"],
  [ErrorCode.TENANT_MEMBERSHIP_DENIED]: ["tenantId", "userId", "reason"],
  [ErrorCode.TENANT_MEMBERSHIP_INACTIVE]: ["tenantId", "userId", "status"],
  [ErrorCode.TENANT_SERVICE_UNAVAILABLE]: ["tenantId", "userId", "reason"],
  [ErrorCode.TENANT_CONTEXT_UNVERIFIED]: ["tenantId"],
  [ErrorCode.ANALYTICS_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.AUTHENTICATION_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.GUEST_SIGNUP_FAILED]: ["reason"],
  [ErrorCode.BLOG_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.EVENT_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.GATEWAY_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.INVITATION_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.NOTIFICATION_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.PROFILE_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.SEAT_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.SHOPPING_CART_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.TICKET_INTERNAL_ERROR]: ["reason"],
  [ErrorCode.USER_INTERNAL_ERROR]: ["reason"],
});

const explicitDefinitions: Readonly<
  Partial<Record<ErrorCode, DefinitionInput>>
> = Object.freeze({
  [ErrorCode.INVALID_CREDENTIALS]: definition(
    "Authentication failed.",
    "The supplied credentials are invalid.",
    401,
  ),
  [ErrorCode.UNAUTHENTICATED]: definition(
    "Authentication required.",
    "Authentication is required.",
    401,
  ),
  [ErrorCode.UNAUTHORIZED]: definition(
    "Authentication required.",
    "Authentication is required.",
    401,
  ),
  [ErrorCode.FORBIDDEN]: definition(
    "Access denied.",
    "You are not allowed to perform this operation.",
    403,
  ),
  [ErrorCode.ACCESS_DENIED]: definition(
    "Access denied.",
    "You are not allowed to access this resource.",
    403,
  ),
  [ErrorCode.VALIDATION_ERROR]: definition(
    "Validation failed.",
    "The supplied input is invalid.",
    400,
  ),
  [ErrorCode.NOT_FOUND]: definition(
    "Resource not found.",
    "The requested resource was not found.",
    404,
  ),
  [ErrorCode.CONFLICT]: definition(
    "Request conflict.",
    "The request conflicts with the current state.",
    409,
  ),
  [ErrorCode.INTERNAL_SERVER_ERROR]: definition(
    "Internal service error.",
    "An unexpected error occurred.",
    500,
  ),
  [ErrorCode.SERVICE_UNAVAILABLE]: definition(
    "Service unavailable.",
    "The service is temporarily unavailable.",
    503,
    true,
  ),
  [ErrorCode.DEPENDENCY_UNAVAILABLE]: definition(
    "Dependency unavailable.",
    "A dependent service is temporarily unavailable.",
    503,
    true,
  ),
  [ErrorCode.NETWORK_ERROR]: definition(
    "Network request failed.",
    "A dependent service could not be reached.",
    503,
    true,
  ),
  [ErrorCode.RATE_LIMIT_EXCEEDED]: definition(
    "Rate limit exceeded.",
    "Too many requests.",
    429,
    true,
  ),
  [ErrorCode.IDENTITY_PROVIDER_UNAVAILABLE]: definition(
    "Identity provider unavailable.",
    "The identity provider is temporarily unavailable.",
    503,
    true,
  ),
  [ErrorCode.IDENTITY_PROVIDER_CLIENT_CONFIGURATION_INVALID]: definition(
    "Identity provider client configuration is invalid.",
    "Authentication is temporarily unavailable.",
    500,
  ),
  [ErrorCode.IDENTITY_PROVIDER_ADMIN_CREDENTIALS_INVALID]: definition(
    "Identity provider administrator authentication failed.",
    "Identity provider administrator credentials are invalid.",
    401,
  ),
  [ErrorCode.IDENTITY_PROVIDER_ADMIN_FORBIDDEN]: definition(
    "Identity provider administrator access denied.",
    "The identity provider administrator lacks the required permissions.",
    403,
  ),
  [ErrorCode.IDENTITY_PROVIDER_RATE_LIMITED]: definition(
    "Identity provider rate limit exceeded.",
    "The identity provider is temporarily rate limited.",
    429,
    true,
  ),
  [ErrorCode.IDENTITY_PROVIDER_RESPONSE_INVALID]: definition(
    "Identity provider response is invalid.",
    "The identity provider returned an invalid response.",
    502,
    true,
  ),
  [ErrorCode.IDENTITY_PROVIDER_REQUEST_REJECTED]: definition(
    "Identity provider rejected the request.",
    "The identity provider rejected the request.",
    400,
  ),
  [ErrorCode.AUTHENTICATION_PASSWORD_POLICY]: definition(
    "Password policy validation failed.",
    "The password does not meet the policy requirements.",
    400,
  ),
  [ErrorCode.AUTHENTICATION_UNAUTHORIZED]: definition(
    "Authentication operation forbidden.",
    "You are not authorized to perform this authentication operation.",
    403,
  ),
  [ErrorCode.AUTHENTICATION_INTERNAL_ERROR]: internalDefinition(
    "Authentication service error.",
  ),
  [ErrorCode.GUEST_SIGNUP_FAILED]: definition(
    "Guest sign-up could not be completed.",
    "Your guest sign-up could not be completed. Please try again.",
    503,
    true,
  ),
  [ErrorCode.ANALYTICS_API_KEY_REQUIRED]: definition(
    "Analytics API key required.",
    "An analytics API key is required.",
    401,
  ),
  [ErrorCode.ANALYTICS_API_KEY_INVALID]: definition(
    "Analytics API key invalid.",
    "The analytics API key is invalid.",
    401,
  ),
  [ErrorCode.ANALYTICS_API_KEY_EXPIRED]: definition(
    "Analytics API key expired.",
    "The analytics API key has expired.",
    401,
  ),
  [ErrorCode.ANALYTICS_API_KEY_REVOKED]: definition(
    "Analytics API key revoked.",
    "The analytics API key has been revoked.",
    401,
  ),
  [ErrorCode.ANALYTICS_SCOPE_FORBIDDEN]: definition(
    "Analytics scope denied.",
    "The analytics API key lacks the required scope.",
    403,
  ),
  [ErrorCode.SHOPPING_CART_QUANTITY_INVALID]: definition(
    "Shopping cart quantity invalid.",
    "The shopping cart quantity is invalid.",
    400,
  ),
  [ErrorCode.RSVP_NOT_SUBMITTED]: definition(
    "RSVP not submitted.",
    "Guest has not submitted an RSVP yet.",
    422,
  ),
  [ErrorCode.RSVP_NOT_ACCEPTED]: definition(
    "RSVP not accepted.",
    "Guest must accept the RSVP before this operation.",
    422,
  ),
  [ErrorCode.INVITATION_PREVIEW_FAILED]: definition(
    "Invitation preview failed.",
    "The invitation preview could not be generated.",
    422,
  ),
  [ErrorCode.SEAT_ALLOCATION_EXCEEDED]: definition(
    "Seat allocation exceeded.",
    "The seat allocation limit has been exceeded.",
    400,
  ),
  [ErrorCode.ANALYTICS_INTERNAL_ERROR]: internalDefinition(
    "Analytics service error.",
  ),
  [ErrorCode.BLOG_INTERNAL_ERROR]: internalDefinition("Blog service error."),
  [ErrorCode.EVENT_INTERNAL_ERROR]: internalDefinition("Event service error."),
  [ErrorCode.GATEWAY_INTERNAL_ERROR]: internalDefinition("Gateway error."),
  [ErrorCode.INVITATION_INTERNAL_ERROR]: internalDefinition(
    "Invitation service error.",
  ),
  [ErrorCode.NOTIFICATION_INTERNAL_ERROR]: internalDefinition(
    "Notification service error.",
  ),
  [ErrorCode.PROFILE_INTERNAL_ERROR]: internalDefinition(
    "Profile service error.",
  ),
  [ErrorCode.SEAT_INTERNAL_ERROR]: internalDefinition("Seat service error."),
  [ErrorCode.SHOPPING_CART_INTERNAL_ERROR]: internalDefinition(
    "Shopping cart service error.",
  ),
  [ErrorCode.TICKET_INTERNAL_ERROR]: internalDefinition(
    "Ticket service error.",
  ),
  [ErrorCode.USER_INTERNAL_ERROR]: internalDefinition("User service error."),
  [ErrorCode.TENANT_HEADER_MISSING]: definition(
    "Tenant header missing.",
    "A tenant context is required for this operation.",
    400,
  ),
  [ErrorCode.TENANT_HEADER_INVALID]: definition(
    "Tenant header invalid.",
    "The supplied tenant identifier is invalid.",
    400,
  ),
  [ErrorCode.TENANT_NOT_FOUND]: definition(
    "Tenant not found.",
    "The requested tenant does not exist.",
    404,
  ),
  [ErrorCode.TENANT_DISABLED]: definition(
    "Tenant disabled.",
    "The requested tenant is not active.",
    403,
  ),
  [ErrorCode.TENANT_MEMBERSHIP_NOT_FOUND]: definition(
    "Tenant membership not found.",
    "No membership exists for this user in the tenant.",
    403,
  ),
  [ErrorCode.TENANT_MEMBERSHIP_DENIED]: definition(
    "Tenant membership denied.",
    "The user has no active membership in the tenant.",
    403,
  ),
  [ErrorCode.TENANT_MEMBERSHIP_INACTIVE]: definition(
    "Tenant membership inactive.",
    "The user's membership in the tenant is not active.",
    403,
  ),
  [ErrorCode.TENANT_SERVICE_UNAVAILABLE]: definition(
    "Tenant service unavailable.",
    "The tenant service is temporarily unavailable.",
    503,
    true,
  ),
  [ErrorCode.TENANT_CONTEXT_UNVERIFIED]: internalDefinition(
    "Tenant context unverified.",
  ),
});

export const ERROR_DEFINITIONS: Readonly<Record<ErrorCode, ErrorDefinition>> =
  Object.freeze(
    Object.fromEntries(
      Object.values(ErrorCode).map((code) => [
        code,
        Object.freeze({
          code,
          ...(explicitDefinitions[code] ?? inferredDefinition(code)),
          publicMetadataKeys: Object.freeze([
            ...(publicMetadataKeys[code] ?? []),
          ]),
        }),
      ]),
    ) as Record<ErrorCode, ErrorDefinition>,
  );

export function getErrorDefinition(code: string): ErrorDefinition {
  return (
    ERROR_DEFINITIONS[code as ErrorCode] ??
    Object.freeze({
      code,
      summary: "Internal service error.",
      defaultMessage: "An unexpected error occurred.",
      httpStatus: 500,
      retryable: false,
      publicMetadataKeys: Object.freeze([]),
    })
  );
}

export function isKnownErrorCode(code: string): boolean {
  return Object.prototype.hasOwnProperty.call(ERROR_DEFINITIONS, code);
}

export function getPublicErrorMetadata(
  code: string,
  metadata: Readonly<Record<string, unknown>> | undefined,
): Readonly<Record<string, unknown>> {
  if (!metadata) return {};
  const allowed = new Set(getErrorDefinition(code).publicMetadataKeys);
  return Object.freeze(
    Object.fromEntries(
      Object.entries(metadata).filter(([key]) => allowed.has(key)),
    ),
  );
}

function definition(
  summary: string,
  defaultMessage: string,
  httpStatus: number,
  retryable = false,
): DefinitionInput {
  return { summary, defaultMessage, httpStatus, retryable };
}

function internalDefinition(summary: string): DefinitionInput {
  return definition(summary, "An unexpected error occurred.", 500);
}

function inferredDefinition(code: ErrorCode): DefinitionInput {
  const summary = `${titleCase(code)}.`;

  if (code.endsWith("_NOT_FOUND")) {
    return definition(summary, "The requested resource was not found.", 404);
  }
  if (
    code.includes("ACCESS_DENIED") ||
    code.includes("FORBIDDEN") ||
    code === ErrorCode.UNAUTHORIZED_TENANT
  ) {
    return definition(summary, "Access to the requested resource is denied.", 403);
  }
  if (
    code.includes("ALREADY") ||
    code.includes("CONFLICT") ||
    code.includes("DUPLICATE") ||
    code === ErrorCode.SEAT_OCCUPIED
  ) {
    return definition(summary, "The request conflicts with the current state.", 409);
  }
  if (
    code.includes("UNAVAILABLE") ||
    code === ErrorCode.KAFKA_UNAVAILABLE ||
    code === ErrorCode.CACHE_UNAVAILABLE ||
    code === ErrorCode.MINIO_UNAVAILABLE
  ) {
    return definition(summary, "A required service is temporarily unavailable.", 503, true);
  }
  if (
    code.includes("INVALID") ||
    code.includes("EXPIRED") ||
    code.includes("REVOKED") ||
    code.includes("REQUIRED") ||
    code.includes("MISSING") ||
    code.includes("CLOSED") ||
    code.includes("STATE") ||
    code.includes("LIMIT_REACHED") ||
    code.includes("CAPACITY_EXCEEDED")
  ) {
    return definition(summary, "The request cannot be processed.", 400);
  }
  return definition(summary, "The request could not be completed.", 500);
}

function titleCase(code: string): string {
  const words = code.toLowerCase().split("_");
  return words
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    )
    .join(" ");
}
