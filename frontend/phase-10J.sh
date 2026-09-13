#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10J"
echo "API / TRANSPORT ADAPTER DEPTH + BACKEND CONTRACT ALIGNMENT"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10J-backup-$STAMP"

mkdir -p "$BACKUP"

DOMAINS=(dashboard properties leases payments devices locks security)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/api" \
    "src/features/$domain/api/resources" \
    "src/features/$domain/api/requests" \
    "src/features/$domain/api/responses" \
    "src/features/$domain/api/mappers" \
    "src/features/$domain/api/errors" \
    "src/features/$domain/api/paths" \
    "src/features/$domain/api/pagination" \
    "src/features/$domain/api/headers" \
    "src/features/$domain/transport" \
    "src/features/$domain/transport/http" \
    "src/features/$domain/transport/normalization" \
    "src/features/$domain/transport/errors" \
    "src/features/$domain/contracts"
done

mkdir -p \
  src/application/api \
  src/application/api/contracts \
  src/application/api/requests \
  src/application/api/responses \
  src/application/api/errors \
  src/application/api/headers \
  src/application/api/pagination \
  src/application/api/correlation \
  src/application/transport \
  src/application/transport/http \
  src/application/transport/decoding \
  src/application/transport/encoding \
  src/application/transport/errors \
  src/application/transport/middleware \
  src/application/contracts/http \
  src/application/contracts/backend \
  src/runtime/api \
  src/runtime/api/routes \
  src/runtime/api/services \
  src/runtime/api/adapters

# ============================================================
# HTTP CONTRACT CORE
# ============================================================

cat > src/application/api/contracts/httpMethod.ts <<'EOF'
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
EOF

cat > src/application/api/contracts/httpRequest.ts <<'EOF'
import type { HttpMethod } from "./httpMethod"

export interface HttpRequest<T = unknown> {
  method: HttpMethod
  path: string
  query?: Record<string, unknown>
  headers?: Record<string, string>
  body?: T
  correlationId?: string
}
EOF

cat > src/application/api/contracts/httpResponse.ts <<'EOF'
export interface HttpResponse<T = unknown> {
  status: number
  headers: Record<string, string>
  data?: T
  correlationId?: string
}
EOF

cat > src/application/api/contracts/httpErrorResponse.ts <<'EOF'
export interface HttpErrorResponse {
  status: number
  code?: string
  message: string
  details?: unknown
  correlationId?: string
}
EOF

cat > src/application/api/contracts/index.ts <<'EOF'
export * from "./httpMethod"
export * from "./httpRequest"
export * from "./httpResponse"
export * from "./httpErrorResponse"
EOF

# ============================================================
# BACKEND CONTRACT CORE
# ============================================================

cat > src/application/contracts/backend/backendRouteVerification.ts <<'EOF'
export interface BackendRouteVerification {
  domain: string
  method: string
  path: string
  verified: boolean
  reason?: string
}
EOF

cat > src/application/contracts/backend/backendCapability.ts <<'EOF'
export interface BackendCapability {
  id: string
  domain: string
  readable: boolean
  writable: boolean
  commandable: boolean
  verified: boolean
  reason?: string
}
EOF

cat > src/application/contracts/backend/backendContract.ts <<'EOF'
import type { BackendCapability } from "./backendCapability"

export interface BackendContract {
  service: string
  capabilities: BackendCapability[]
}
EOF

cat > src/application/contracts/backend/index.ts <<'EOF'
export * from "./backendRouteVerification"
export * from "./backendCapability"
export * from "./backendContract"
EOF

# ============================================================
# REQUEST / RESPONSE CORE
# ============================================================

cat > src/application/api/requests/requestBuilder.ts <<'EOF'
import type { HttpMethod } from "../contracts"

export interface RequestBuilder {
  build<T>(
    method: HttpMethod,
    path: string,
    body?: T,
  ): {
    method: HttpMethod
    path: string
    body?: T
  }
}

export function createRequestBuilder():
  RequestBuilder {
  return {
    build(method, path, body) {
      return {
        method,
        path,
        body,
      }
    },
  }
}
EOF

cat > src/application/api/requests/queryBuilder.ts <<'EOF'
export function buildQuery(
  values: Record<string, unknown>,
): string {
  const entries = Object.entries(values)
    .filter(([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "",
    )

  if (entries.length === 0) return ""

  const params = new URLSearchParams()

  for (const [key, value] of entries) {
    params.set(key, String(value))
  }

  return `?${params.toString()}`
}
EOF

cat > src/application/api/requests/paginationRequest.ts <<'EOF'
export interface PaginationRequest {
  page?: number
  pageSize?: number
}
EOF

cat > src/application/api/responses/paginationResponse.ts <<'EOF'
export interface PaginationResponse<T> {
  items: T[]
  page?: number
  pageSize?: number
  total?: number
  hasNext?: boolean
}
EOF

cat > src/application/api/responses/resourceResponse.ts <<'EOF'
export interface ResourceResponse<T> {
  data: T
  version?: number
  updatedAt?: string
  correlationId?: string
}
EOF

cat > src/application/api/responses/collectionResponse.ts <<'EOF'
export interface CollectionResponse<T> {
  items: T[]
  total?: number
  correlationId?: string
}
EOF

# ============================================================
# ERRORS
# ============================================================

cat > src/application/api/errors/apiError.ts <<'EOF'
export class ApiError extends Error {
  readonly status: number
  readonly code?: string
  readonly correlationId?: string

  constructor(
    message: string,
    status: number,
    code?: string,
    correlationId?: string,
  ) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.correlationId = correlationId
  }
}
EOF

cat > src/application/api/errors/mapStatusError.ts <<'EOF'
export function mapStatusError(
  status: number,
): string {
  switch (status) {
    case 400:
      return "Invalid request."
    case 401:
      return "Authentication required."
    case 403:
      return "Authorization denied."
    case 404:
      return "Resource not found."
    case 409:
      return "Resource conflict."
    case 422:
      return "Domain validation failed."
    case 429:
      return "Rate limit reached."
    default:
      return status >= 500
        ? "Backend service failure."
        : "Request failed."
  }
}
EOF

cat > src/application/api/errors/unsupportedIngressError.ts <<'EOF'
export class UnsupportedIngressError extends Error {
  constructor(
    domain: string,
  ) {
    super(
      `${domain} production HTTP ingress is not verified.`,
    )
    this.name = "UnsupportedIngressError"
  }
}
EOF

# ============================================================
# HEADERS / CORRELATION
# ============================================================

cat > src/application/api/headers/standardHeaders.ts <<'EOF'
export function standardHeaders(
  correlationId?: string,
): Record<string, string> {
  return {
    Accept: "application/json",
    ...(correlationId
      ? {
          "X-Correlation-ID": correlationId,
        }
      : {}),
  }
}
EOF

cat > src/application/api/headers/jsonHeaders.ts <<'EOF'
export function jsonHeaders(
  correlationId?: string,
): Record<string, string> {
  return {
    ...standardHeaders(correlationId),
    "Content-Type": "application/json",
  }
}

import {
  standardHeaders,
} from "./standardHeaders"
EOF

cat > src/application/api/correlation/correlationId.ts <<'EOF'
export function createCorrelationId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random()}`
  )
}
EOF

cat > src/application/api/correlation/correlationContext.ts <<'EOF'
export interface CorrelationContext {
  correlationId: string
  causationId?: string
  requestId?: string
}
EOF

# ============================================================
# PAGINATION
# ============================================================

cat > src/application/api/pagination/pageState.ts <<'EOF'
export interface PageState {
  page: number
  pageSize: number
  total?: number
  hasNext?: boolean
}
EOF

cat > src/application/api/pagination/normalizePage.ts <<'EOF'
export function normalizePage(
  page?: number,
): number {
  return Math.max(1, page ?? 1)
}
EOF

cat > src/application/api/pagination/normalizePageSize.ts <<'EOF'
export function normalizePageSize(
  pageSize?: number,
): number {
  return Math.max(
    1,
    Math.min(250, pageSize ?? 25),
  )
}
EOF

# ============================================================
# TRANSPORT CORE
# ============================================================

cat > src/application/transport/http/httpTransport.ts <<'EOF'
import type {
  HttpRequest,
  HttpResponse,
} from "../../api/contracts"

export interface HttpTransport {
  request<TRequest, TResponse>(
    request: HttpRequest<TRequest>,
  ): Promise<HttpResponse<TResponse>>
}
EOF

cat > src/application/transport/http/fetchTransport.ts <<'EOF'
import type {
  HttpRequest,
  HttpResponse,
} from "../../api/contracts"
import type { HttpTransport } from "./httpTransport"

export interface FetchTransportConfig {
  baseUrl: string
  fetcher?: typeof fetch
}

export function createFetchTransport(
  config: FetchTransportConfig,
): HttpTransport {
  const fetcher = config.fetcher ?? fetch

  return {
    async request<TRequest, TResponse>(
      request: HttpRequest<TRequest>,
    ): Promise<HttpResponse<TResponse>> {
      const query = request.query
        ? new URLSearchParams(
            Object.entries(request.query)
              .filter(([, value]) =>
                value !== undefined &&
                value !== null,
              )
              .map(([key, value]) => [
                key,
                String(value),
              ]),
          ).toString()
        : ""

      const url =
        `${config.baseUrl}${request.path}` +
        (query ? `?${query}` : "")

      const response = await fetcher(url, {
        method: request.method,
        headers: request.headers,
        body:
          request.body === undefined
            ? undefined
            : JSON.stringify(request.body),
      })

      let data: unknown

      try {
        data = await response.json()
      } catch {
        data = undefined
      }

      return {
        status: response.status,
        headers: Object.fromEntries(
          response.headers.entries(),
        ),
        data: data as TResponse | undefined,
        correlationId:
          response.headers.get(
            "X-Correlation-ID",
          ) ?? undefined,
      }
    },
  }
}
EOF

cat > src/application/transport/decoding/jsonDecoder.ts <<'EOF'
export function decodeJson<T>(
  value: string,
): T {
  return JSON.parse(value) as T
}
EOF

cat > src/application/transport/decoding/responseDecoder.ts <<'EOF'
export function decodeResponse<T>(
  value: unknown,
): T {
  return value as T
}
EOF

cat > src/application/transport/encoding/jsonEncoder.ts <<'EOF'
export function encodeJson(
  value: unknown,
): string {
  return JSON.stringify(value)
}
EOF

cat > src/application/transport/errors/transportError.ts <<'EOF'
export class TransportError extends Error {
  readonly status?: number
  readonly retryable: boolean

  constructor(
    message: string,
    status?: number,
    retryable = false,
  ) {
    super(message)
    this.name = "TransportError"
    this.status = status
    this.retryable = retryable
  }
}
EOF

cat > src/application/transport/middleware/requestMiddleware.ts <<'EOF'
import type { HttpRequest } from "../../api/contracts"

export type RequestMiddleware = <T>(
  request: HttpRequest<T>,
) => HttpRequest<T>
EOF

cat > src/application/transport/middleware/responseMiddleware.ts <<'EOF'
import type { HttpResponse } from "../../api/contracts"

export type ResponseMiddleware = <T>(
  response: HttpResponse<T>,
) => HttpResponse<T>
EOF

# ============================================================
# DOMAIN CONTRACT GENERATOR
# ============================================================

make_api_domain() {
  local domain="$1"
  local singular="$2"
  local label="$3"

  cat > "src/features/$domain/contracts/${singular}ApiRecord.ts" <<EOF
export interface ${singular^}ApiRecord {
  id: string
  status?: string
  version?: number
  updatedAt?: string
  metadata?: Record<string, unknown>
}
EOF

  cat > "src/features/$domain/api/paths/${singular}Paths.ts" <<EOF
export const ${singular}Paths = {
  list: "/api/v1/${domain}",
  detail: (id: string) =>
    "/api/v1/${domain}/" + id,
}
EOF

  cat > "src/features/$domain/api/requests/${singular}ListRequest.ts" <<EOF
export interface ${singular^}ListRequest {
  page?: number
  pageSize?: number
  search?: string
  status?: string
}
EOF

  cat > "src/features/$domain/api/requests/${singular}DetailRequest.ts" <<EOF
export interface ${singular^}DetailRequest {
  id: string
}
EOF

  cat > "src/features/$domain/api/responses/${singular}ListResponse.ts" <<EOF
import type { ${singular^}ApiRecord } from "../../contracts/${singular}ApiRecord"

export interface ${singular^}ListResponse {
  items: ${singular^}ApiRecord[]
  total?: number
  page?: number
  pageSize?: number
}
EOF

  cat > "src/features/$domain/api/responses/${singular}DetailResponse.ts" <<EOF
import type { ${singular^}ApiRecord } from "../../contracts/${singular}ApiRecord"

export interface ${singular^}DetailResponse {
  data: ${singular^}ApiRecord
  correlationId?: string
}
EOF

  cat > "src/features/$domain/api/mappers/${singular}ResponseMapper.ts" <<EOF
import type { ${singular^}ApiRecord } from "../../contracts/${singular}ApiRecord"

export function map${singular^}Response(
  value: unknown,
): ${singular^}ApiRecord {
  const source =
    value &&
    typeof value === "object"
      ? value as Record<string, unknown>
      : {}

  return {
    id:
      typeof source.id === "string"
        ? source.id
        : "",
    status:
      typeof source.status === "string"
        ? source.status
        : undefined,
    version:
      typeof source.version === "number"
        ? source.version
        : undefined,
    updatedAt:
      typeof source.updatedAt === "string"
        ? source.updatedAt
        : undefined,
    metadata:
      source.metadata &&
      typeof source.metadata === "object"
        ? source.metadata as Record<string, unknown>
        : undefined,
  }
}
EOF

  cat > "src/features/$domain/api/mappers/${singular}RequestMapper.ts" <<EOF
export function map${singular^}Request(
  value: Record<string, unknown>,
): Record<string, unknown> {
  return {
    ...value,
  }
}
EOF

  cat > "src/features/$domain/api/errors/${singular}ApiError.ts" <<EOF
export interface ${singular^}ApiError {
  status: number
  code?: string
  message: string
  correlationId?: string
}
EOF

  cat > "src/features/$domain/api/headers/${singular}Headers.ts" <<EOF
export function ${singular}Headers(
  correlationId?: string,
): Record<string, string> {
  return {
    Accept: "application/json",
    ...(correlationId
      ? {
          "X-Correlation-ID": correlationId,
        }
      : {}),
  }
}
EOF

  cat > "src/features/$domain/api/pagination/${singular}Pagination.ts" <<EOF
export interface ${singular^}Pagination {
  page: number
  pageSize: number
  total?: number
  hasNext?: boolean
}
EOF

  cat > "src/features/$domain/api/resources/${singular}Resource.ts" <<EOF
export interface ${singular^}Resource<T = unknown> {
  id: string
  data?: T
  loading: boolean
  refreshing: boolean
  stale: boolean
  error?: string
  version: number
}
EOF

  cat > "src/features/$domain/api/resources/${singular}ResourceFactory.ts" <<EOF
import type { ${singular^}Resource } from "./${singular}Resource"

export function create${singular^}Resource<T>(
  id: string,
): ${singular^}Resource<T> {
  return {
    id,
    loading: false,
    refreshing: false,
    stale: false,
    version: 0,
  }
}
EOF

  cat > "src/features/$domain/transport/http/${singular}HttpClient.ts" <<EOF
import type { HttpTransport } from "../../../../application/transport/http/httpTransport"

export interface ${singular^}HttpClient {
  transport: HttpTransport
}

export function create${singular^}HttpClient(
  transport: HttpTransport,
): ${singular^}HttpClient {
  return {
    transport,
  }
}
EOF

  cat > "src/features/$domain/transport/normalization/${singular}TransportNormalizer.ts" <<EOF
export function normalize${singular^}Transport(
  value: unknown,
): unknown {
  return value
}
EOF

  cat > "src/features/$domain/transport/errors/${singular}TransportError.ts" <<EOF
export class ${singular^}TransportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "${singular^}TransportError"
  }
}
EOF
}

# Verified collection/detail ingress domains.
make_api_domain dashboard dashboard Dashboard
make_api_domain properties property Properties
make_api_domain leases lease Leases
make_api_domain payments payment Payments
make_api_domain devices device Devices

# Fail-closed domains still get contracts/adapters,
# but do not claim verified collection ingress.
make_api_domain locks lock Locks
make_api_domain security security Security

# ============================================================
# DEVICE VERIFIED ROUTE CONTRACTS
# ============================================================

mkdir -p src/features/devices/api/paths

cat > src/features/devices/api/paths/deviceVerifiedPaths.ts <<'EOF'
export const deviceVerifiedPaths = {
  register: "/api/v1/register",
  status: "/api/v1/status",
  command: "/api/v1/command",
  detail: (id: string) =>
    `/api/v1/devices/${id}`,
}
EOF

cat > src/features/devices/api/requests/deviceRegisterRequest.ts <<'EOF'
export interface DeviceRegisterRequest {
  deviceId: string
  metadata?: Record<string, unknown>
}
EOF

cat > src/features/devices/api/requests/deviceStatusRequest.ts <<'EOF'
export interface DeviceStatusRequest {
  deviceId: string
}
EOF

cat > src/features/devices/api/requests/deviceCommandRequest.ts <<'EOF'
export interface DeviceCommandRequest {
  deviceId: string
  command: string
  payload?: Record<string, unknown>
}
EOF

cat > src/features/devices/api/responses/deviceCommandResponse.ts <<'EOF'
export interface DeviceCommandResponse {
  accepted: boolean
  commandId?: string
  correlationId?: string
  message?: string
}
EOF

cat > src/features/devices/api/responses/deviceStatusResponse.ts <<'EOF'
export interface DeviceStatusResponse {
  deviceId: string
  status?: string
  connected?: boolean
  updatedAt?: string
}
EOF

# ============================================================
# LOCK / SECURITY FAIL-CLOSED CONTRACTS
# ============================================================

cat > src/features/locks/api/paths/lockIngressStatus.ts <<'EOF'
export const lockIngressStatus = {
  verified: false,
  reason:
    "No verified production public lock HTTP ingress is registered.",
}
EOF

cat > src/features/security/api/paths/securityIngressStatus.ts <<'EOF'
export const securityIngressStatus = {
  verified: false,
  reason:
    "No verified production public security HTTP ingress is registered.",
}
EOF

cat > src/features/locks/transport/http/lockHttpBoundary.ts <<'EOF'
import { UnsupportedIngressError } from "../../../../application/api/errors/unsupportedIngressError"

export function assertLockIngress(): never {
  throw new UnsupportedIngressError("lock")
}
EOF

cat > src/features/security/transport/http/securityHttpBoundary.ts <<'EOF'
import { UnsupportedIngressError } from "../../../../application/api/errors/unsupportedIngressError"

export function assertSecurityIngress(): never {
  throw new UnsupportedIngressError("security")
}
EOF

# ============================================================
# BACKEND CONTRACT MAP
# ============================================================

cat > src/runtime/api/routes/backendRouteMap.ts <<'EOF'
import type { BackendRouteVerification } from "../../../application/contracts/backend"

export const backendRouteMap:
  BackendRouteVerification[] = [
  {
    domain: "dashboard",
    method: "GET",
    path: "/api/v1/dashboard/overview",
    verified: true,
  },
  {
    domain: "property",
    method: "GET",
    path: "/api/v1/properties",
    verified: true,
  },
  {
    domain: "lease",
    method: "GET",
    path: "/api/v1/leases",
    verified: true,
  },
  {
    domain: "payment",
    method: "GET",
    path: "/api/v1/payments",
    verified: true,
  },
  {
    domain: "device",
    method: "POST",
    path: "/api/v1/register",
    verified: true,
  },
  {
    domain: "device",
    method: "POST",
    path: "/api/v1/status",
    verified: true,
  },
  {
    domain: "device",
    method: "POST",
    path: "/api/v1/command",
    verified: true,
  },
  {
    domain: "device",
    method: "GET",
    path: "/api/v1/devices/:id",
    verified: true,
  },
]
EOF

cat > src/runtime/api/routes/unverifiedRouteMap.ts <<'EOF'
import type { BackendRouteVerification } from "../../../application/contracts/backend"

export const unverifiedRouteMap:
  BackendRouteVerification[] = [
  {
    domain: "lock",
    method: "*",
    path: "/api/v1/locks/*",
    verified: false,
    reason:
      "Public lock HTTP ingress has not been verified.",
  },
  {
    domain: "security",
    method: "*",
    path: "/api/v1/security/*",
    verified: false,
    reason:
      "Public security HTTP ingress has not been verified.",
  },
]
EOF

cat > src/runtime/api/services/backendCapabilityRegistry.ts <<'EOF'
import type { BackendCapability } from "../../../application/contracts/backend"

export const backendCapabilities:
  BackendCapability[] = [
  {
    id: "dashboard.read",
    domain: "dashboard",
    readable: true,
    writable: false,
    commandable: false,
    verified: true,
  },
  {
    id: "property.read",
    domain: "property",
    readable: true,
    writable: false,
    commandable: false,
    verified: true,
  },
  {
    id: "lease.read",
    domain: "lease",
    readable: true,
    writable: false,
    commandable: false,
    verified: true,
  },
  {
    id: "payment.read",
    domain: "payment",
    readable: true,
    writable: false,
    commandable: false,
    verified: true,
  },
  {
    id: "device.register",
    domain: "device",
    readable: true,
    writable: true,
    commandable: true,
    verified: true,
  },
  {
    id: "lock.public",
    domain: "lock",
    readable: false,
    writable: false,
    commandable: false,
    verified: false,
    reason:
      "Public lock ingress not verified.",
  },
  {
    id: "security.public",
    domain: "security",
    readable: false,
    writable: false,
    commandable: false,
    verified: false,
    reason:
      "Public security ingress not verified.",
  },
]
EOF

# ============================================================
# GENERIC DOMAIN API SERVICE
# ============================================================

cat > src/application/api/domainApiClient.ts <<'EOF'
import type {
  HttpMethod,
  HttpResponse,
} from "./contracts"
import type { HttpTransport } from "../transport/http/httpTransport"

export interface DomainApiClient {
  request<TRequest, TResponse>(
    method: HttpMethod,
    path: string,
    body?: TRequest,
  ): Promise<HttpResponse<TResponse>>
}

export function createDomainApiClient(
  transport: HttpTransport,
): DomainApiClient {
  return {
    request(method, path, body) {
      return transport.request({
        method,
        path,
        body,
      })
    },
  }
}
EOF

cat > src/application/api/verifiedCapability.ts <<'EOF'
export interface VerifiedCapability {
  verified: boolean
  reason?: string
}

export function assertVerifiedCapability(
  capability: VerifiedCapability,
): void {
  if (!capability.verified) {
    throw new Error(
      capability.reason ??
      "Capability is not verified.",
    )
  }
}
EOF

# ============================================================
# RUNTIME API ADAPTERS
# ============================================================

cat > src/runtime/api/adapters/verifiedBackendAdapter.ts <<'EOF'
import type { BackendCapability } from "../../../application/contracts/backend"

export interface VerifiedBackendAdapter {
  canUse(
    capability: BackendCapability,
  ): boolean
}

export const verifiedBackendAdapter:
  VerifiedBackendAdapter = {
  canUse(capability) {
    return capability.verified
  },
}
EOF

cat > src/runtime/api/adapters/backendRouteResolver.ts <<'EOF'
import {
  backendRouteMap,
} from "../routes/backendRouteMap"

export function resolveBackendRoute(
  domain: string,
  method: string,
  path: string,
) {
  return backendRouteMap.find(
    (route) =>
      route.domain === domain &&
      route.method === method &&
      route.path === path,
  )
}
EOF

# ============================================================
# FILE INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10J COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "10J LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-35s %s\n" \
  "API contracts" \
  "$(find src/application/api/contracts -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "API requests" \
  "$(find src/application/api/requests -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "API responses" \
  "$(find src/application/api/responses -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "API errors" \
  "$(find src/application/api/errors -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "API headers" \
  "$(find src/application/api/headers -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "API pagination" \
  "$(find src/application/api/pagination -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Transport" \
  "$(find src/application/transport -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Backend contracts" \
  "$(find src/application/contracts/backend src/application/contracts/http -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature API files" \
  "$(find src/features/*/api -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature transport files" \
  "$(find src/features/*/transport -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature contracts" \
  "$(find src/features/*/contracts -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Runtime API" \
  "$(find src/runtime/api -type f 2>/dev/null | wc -l)"

echo
echo "DOMAIN COUNTS"
echo "------------------------------------------------------------"

for domain in "${DOMAINS[@]}"; do
  printf "%-15s %s\n" "$domain" \
    "$(find "src/features/$domain" -type f | wc -l)"
done

echo
echo "Backup: $BACKUP"
echo
echo "============================================================"
echo "NEXT: PHASE 10K"
echo "FRONTEND RESOURCE CLIENTS + DOMAIN SERVICE IMPLEMENTATION DEPTH"
echo "============================================================"
