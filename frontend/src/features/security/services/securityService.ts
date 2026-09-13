import { apiFetch } from "../../../api/client"
import type {
  AccessRecord,
  SecurityCredential,
  SecurityEvent,
  SecuritySummary,
} from "../types/security"

/*
 * These endpoints are intentionally fail-closed until the security
 * HTTP ingress is verified against the production backend composition.
 */

export async function getSecuritySummary(): Promise<SecuritySummary> {
  throw new Error(
    "Security summary HTTP endpoint is not yet verified",
  )
}

export async function listSecurityCredentials(): Promise<
  SecurityCredential[]
> {
  throw new Error(
    "Security credential HTTP endpoint is not yet verified",
  )
}

export async function listAccessRecords(): Promise<AccessRecord[]> {
  throw new Error(
    "Security access HTTP endpoint is not yet verified",
  )
}

export async function listSecurityEvents(): Promise<
  SecurityEvent[]
> {
  throw new Error(
    "Security event HTTP endpoint is not yet verified",
  )
}

void apiFetch
