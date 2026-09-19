# 🧾 Changelog

All notable changes in this project will be documented in this file.


## [4.6.0](https://github.com/omnixys/contracts-ts/compare/v4.5.0...v4.6.0) (2026-09-19)

### Contracts

* **Contracts:** add noise log level ([](https://github.com/omnixys/contracts-ts/commit/2a61033534667f17389e3d7cf7ac656a0477551c))

## [4.5.0](https://github.com/omnixys/contracts-ts/compare/v4.4.0...v4.5.0) (2026-09-13)

### Auth

* **Auth:** add magicLinkDTO ([](https://github.com/omnixys/contracts-ts/commit/b9cae6c7ca920ffd54eaed0b0fee6d9101bdc9b0))

## [4.4.0](https://github.com/omnixys/contracts-ts/compare/v4.3.0...v4.4.0) (2026-09-12)

### Contracts

* **Contracts:** classify guest signup failure as retryable and expose reason ([](https://github.com/omnixys/contracts-ts/commit/43af2d0bb2d2ff6f75b19f2197169ce4d7b69f2e))

## [4.3.0](https://github.com/omnixys/contracts-ts/compare/v4.2.0...v4.3.0) (2026-09-10)

### Contracts

* **Contracts:** expose error reason in metadata for *_INTERNAL_ERROR codes ([](https://github.com/omnixys/contracts-ts/commit/fff694cce68924213c797efcc10fee3e4ff29a57))

## [4.2.0](https://github.com/omnixys/contracts-ts/compare/v4.1.0...v4.2.0) (2026-09-05)

### Contracts

* **Contracts:** add guest confirmation resent analytics event ([](https://github.com/omnixys/contracts-ts/commit/cc6e37456cc25f2a29abda0a5d9ca7336fc6f1de))

## [4.1.0](https://github.com/omnixys/contracts-ts/compare/v4.0.0...v4.1.0) (2026-09-04)

### Ci

* **Ci:** add PR build check workflow for main ([](https://github.com/omnixys/contracts-ts/commit/1031918a7ef8010f1d934dc92ac85dbff877aeb1))
* **Ci:** add npm registry auth before install in release workflow ([](https://github.com/omnixys/contracts-ts/commit/efc335922524629cf5a8f9258b9ff71c14eaebdd))

### Other

* **Other:** Update log.dto.ts ([](https://github.com/omnixys/contracts-ts/commit/5e5f2f222e60f7b513c9ead12544385b20f09be4))

## [4.0.0](https://github.com/omnixys/contracts-ts/compare/v3.4.0...v4.0.0) (2026-09-02)

### Ci

* **Ci:** add labeler ([](https://github.com/omnixys/contracts-ts/commit/744b70c1d2996cafa9a540b587b4fd8f4e1bb190))

### Contracts

* **Contracts:** document identity semantics convention ([](https://github.com/omnixys/contracts-ts/commit/2dbe02d82427bddae59ab1d49c99d1d4b5c18c5e))
* **Contracts:** add keycloakSub to user provisioning contract ([](https://github.com/omnixys/contracts-ts/commit/b6d7ae89d85fa0aa61fea4720fe4c54cff509f23))

### Identity

* **Identity:** separate user id from keycloak subject ([](https://github.com/omnixys/contracts-ts/commit/c3f397d9c28000d837e1ee9bb512a4bdb08cb7f0))
* **Identity:** add principal type and token identity claim constants ([](https://github.com/omnixys/contracts-ts/commit/f1c289c0acae69946ab7014f78c15a20c008288f))

### Other

* **Other:** update observed runtime tool versions ([](https://github.com/omnixys/contracts-ts/commit/0ad92ce8aa6641b006c42f4ad1cae26f123c1d1f))
* **Other:** Merge pull request #1 from omnixys/migration/uuid-v7 ([](https://github.com/omnixys/contracts-ts/commit/42031833b36e747bc5052faf5657e563481ebb04)), closes [#1](https://github.com/omnixys/contracts-ts/issues/1)

### Release

* **Release:** align package release toolchain with node 26 and pnpm 11 ([](https://github.com/omnixys/contracts-ts/commit/53bcfdacfc138cbd6fd945e0c6adab6c7394d73c))

### Runtime

* **Runtime:** require node 26.8.1 ([](https://github.com/omnixys/contracts-ts/commit/64f57a3565a1ce1bfbf945b194e75c76b0a9b563))

### Semver

* **Semver:** align labels with release convention ([](https://github.com/omnixys/contracts-ts/commit/257f40631d6461ecf53ccf5582a39f81175705d3))

## [3.4.0](https://github.com/omnixys/contracts-ts/compare/v3.3.0...v3.4.0) (2026-08-28)

### ⚠ BREAKING CHANGE

* **Contracts:** require tenant in guest auth payload

### Agent

* **Agent:** add repository development instructions ([](https://github.com/omnixys/contracts-ts/commit/b10cefa0fdc50db280d11182089b6156b4720805))

### Contracts

* **Contracts:** require tenant in guest auth payload ([](https://github.com/omnixys/contracts-ts/commit/a6d8264f74271ba5a20da3c27853f64e7e03781d))

## [3.3.0](https://github.com/omnixys/contracts-ts/compare/v3.2.3...v3.3.0) (2026-08-01)

### Tenant

* **Tenant:** add OMNIXYS_TENANT_ID canonical UUID constant ([](https://github.com/omnixys/contracts-ts/commit/fb4b789fbcda9b7854f5e9e8fc346b5afe87cb14))
* **Tenant:** add TENANT_* error codes and definitions ([](https://github.com/omnixys/contracts-ts/commit/241d24cf350ff7e79d9fa53ecf195a832b45b911))

## [3.2.3](https://github.com/omnixys/contracts-ts/compare/v3.2.2...v3.2.3) (2026-07-30)

### Deps

* **Deps:** fix imports ([](https://github.com/omnixys/contracts-ts/commit/e295099d9f71c72cf792b1b4e7d273736673d341))

## [3.2.2](https://github.com/omnixys/contracts-ts/compare/v3.2.1...v3.2.2) (2026-07-29)

### Rename

* **Rename:** rename repo ([](https://github.com/omnixys/contracts-ts/commit/a1a079cb1a0b4d5aceb5b4155927c080346803fb))

## [3.2.1](https://github.com/omnixys/contracts-ts/compare/v3.2.0...v3.2.1) (2026-07-29)

### Rename

* **Rename:** rename repo ([](https://github.com/omnixys/contracts-ts/commit/7621174e8b9aa0250459f0edf2657efbb6c3ad66))

## [3.2.0](https://github.com/omnixys/contracts/compare/v3.1.0...v3.2.0) (2026-07-29)

### ⚠ BREAKING CHANGE

* **Errors:** actor and tenant identifiers and unallowlisted metadata are no longer transport-visible.

### Analytics

* **Analytics:** add domain fact contracts ([](https://github.com/omnixys/contracts/commit/6497de5838566b5db95b40031898a71787582fa9))
* **Analytics:** add platform event contracts ([](https://github.com/omnixys/contracts/commit/c3609ff22b091ca03290fbe67c33d6fb5f297538))
* **Analytics:** add processing event contracts ([](https://github.com/omnixys/contracts/commit/718f28b3ba13e70f8cf8c265cb9606c22a74c4aa))
* **Analytics:** add replay processing metadata ([](https://github.com/omnixys/contracts/commit/090f045b4704405e59f8c8b9bb295e819ee5ecb4))
* **Analytics:** add resource event contracts ([](https://github.com/omnixys/contracts/commit/9aa5b1cab6372b2826364d7d25b163c379ca6bc0))

### Contracts

* **Contracts:** avoid duplicate exception exports ([](https://github.com/omnixys/contracts/commit/a5f8d1c1033b067aced5e7cb5553c68624af0a0c))

### Errors

* **Errors:** add secure versioned error catalog ([](https://github.com/omnixys/contracts/commit/a6a7f9fbae51b865688a46d1869a92955839cd3f))

### Feature-flags

* **Feature-flags:** add evaluation contracts ([](https://github.com/omnixys/contracts/commit/a6c3bcdac8ac92dfd6459d9bb684499220b9f658))
* **Feature-flags:** accept idempotent evaluation ids ([](https://github.com/omnixys/contracts/commit/eaf9941e6168f1fe504ac8f387467d1c22153cd5))

### Metrics

* **Metrics:** add semantic definition contracts ([](https://github.com/omnixys/contracts/commit/d803d97e3b5fdd5e8eb46b53de6b75410a0306fc))

### Rules

* **Rules:** add audience membership actions ([](https://github.com/omnixys/contracts/commit/3a1ceab2ec667a71e2426ee67f118b589b01f2d4))
* **Rules:** add declarative action contracts ([](https://github.com/omnixys/contracts/commit/f366e4a1d5cbf2bddb6032c2117b34802f81c496))
* **Rules:** propagate processing causation ([](https://github.com/omnixys/contracts/commit/2601e5dbd734a04aa4735a76a013f8602c73588e))

## [3.1.0](https://github.com/omnixys/contracts/compare/v3.0.0...v3.1.0) (2026-07-21)

### Interface

* **Interface:** add UserProjectionChangedDTO interface ([](https://github.com/omnixys/contracts/commit/88c115276ff4123392c5bb55eaa07f9ab523660b))

## [3.0.0](https://github.com/omnixys/contracts/compare/v2.1.3...v3.0.0) (2026-07-15)

### Update

* **Update:** update ([](https://github.com/omnixys/contracts/commit/5afa3f7bb22b3b9b45cc38d8ae8ce03b14385fb0))

## [2.1.3](https://github.com/omnixys/contracts/compare/v2.1.2...v2.1.3) (2026-07-03)

### Deps

* **Deps:** update dtos ([](https://github.com/omnixys/contracts/commit/61bcb789cf829ad136bbd61e75fc77d48a3dd9cf))

## [2.1.2](https://github.com/omnixys/contracts/compare/v2.1.1...v2.1.2) (2026-07-02)

### TicketReleaseAt

* **TicketReleaseAt:** Update event.dto.ts ([](https://github.com/omnixys/contracts/commit/d20fbcca3297d92a02ff0701f0d17f89fe73ae02))

## [2.1.1](https://github.com/omnixys/contracts/compare/v2.1.0...v2.1.1) (2026-07-02)

### EventCreateDTO

* **EventCreateDTO:** add allowGuestSeatSelection ([](https://github.com/omnixys/contracts/commit/27a8bee37947dd947fb3675cc8765dec69d917f6))

## [2.1.0](https://github.com/omnixys/contracts/compare/v2.0.1...v2.1.0) (2026-07-02)

### EventDTO

* **EventDTO:** update eventCreateDTO ([](https://github.com/omnixys/contracts/commit/c2e1a0ed040507788d0793031f8cbff903f5228a))

## [2.0.0](https://github.com/omnixys/contracts/compare/v1.0.0...v2.0.0) (2026-06-23)

### Contracts

* **Contracts:** consolidate shared domain types and runtime contracts ([](https://github.com/omnixys/contracts/commit/fcd863e06136e305f5c64680b6877c0b4a9e3880))

### Semver

* **Semver:** add semver ([](https://github.com/omnixys/contracts/commit/e59f139d27c6d18b7f0a582fd7c08aa9afe927cc))
* **Semver:** add semver ([](https://github.com/omnixys/contracts/commit/722985dedcd3103d7acd4a5dc6ecb8c5b0514907))
* **Semver:** add Semver ([](https://github.com/omnixys/contracts/commit/6bcfadcc0293800ba59bc2de9b7456f92f2a0a54))

### Shared

* **Shared:** consolidate shared domain types and runtime contracts ([](https://github.com/omnixys/contracts/commit/e3cf74ff53a811539482cd97f60c0b800b570663))
* **Shared:** document canonical contracts ownership ([](https://github.com/omnixys/contracts/commit/725e0bbfe121c9ffe54e90b9594ab88395f9c89b))
* **Shared:** delegate contracts to canonical package ([](https://github.com/omnixys/contracts/commit/1cdce451f59790dace1448656f7817cbed6ffec7))
