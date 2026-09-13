import type {
  SecurityCredential,
  AccessRecord,
  SecurityEvent,
} from "../../features/security/types/security"
import { normalizeStatus } from "../normalization/status"

export function adaptCredential(
  input: Record<string, unknown>,
): SecurityCredential {
  return {
    id: String(input.id ?? ""),
    subjectId:
      String(
        input.subjectId ??
          input.subject_id ??
          "",
      ),
    leaseId:
      typeof input.leaseId === "string"
        ? input.leaseId
        : typeof input.lease_id === "string"
          ? input.lease_id
          : undefined,
    credentialType:
      String(
        input.credentialType ??
          input.credential_type ??
          "unknown",
      ),
    status:
      normalizeStatus(
        input.status,
      ) as SecurityCredential["status"],
    issuedAt:
      typeof input.issuedAt === "string"
        ? input.issuedAt
        : typeof input.issued_at === "string"
          ? input.issued_at
          : undefined,
    expiresAt:
      typeof input.expiresAt === "string"
        ? input.expiresAt
        : typeof input.expires_at === "string"
          ? input.expires_at
          : undefined,
    revokedAt:
      typeof input.revokedAt === "string"
        ? input.revokedAt
        : typeof input.revoked_at === "string"
          ? input.revoked_at
          : undefined,
  }
}

export function adaptAccessRecord(
  input: Record<string, unknown>,
): AccessRecord {
  return {
    id: String(input.id ?? ""),
    subjectId:
      String(
        input.subjectId ??
          input.subject_id ??
          "",
      ),
    propertyId:
      typeof input.propertyId === "string"
        ? input.propertyId
        : typeof input.property_id === "string"
          ? input.property_id
          : undefined,
    lockId:
      typeof input.lockId === "string"
        ? input.lockId
        : typeof input.lock_id === "string"
          ? input.lock_id
          : undefined,
    leaseId:
      typeof input.leaseId === "string"
        ? input.leaseId
        : typeof input.lease_id === "string"
          ? input.lease_id
          : undefined,
    state:
      normalizeStatus(
        input.state,
      ) as AccessRecord["state"],
    reason:
      typeof input.reason === "string"
        ? input.reason
        : undefined,
    updatedAt:
      typeof input.updatedAt === "string"
        ? input.updatedAt
        : typeof input.updated_at === "string"
          ? input.updated_at
          : undefined,
  }
}

export function adaptSecurityEvent(
  input: Record<string, unknown>,
): SecurityEvent {
  return {
    id: String(input.id ?? ""),
    eventType:
      String(
        input.eventType ??
          input.event_type ??
          "security.event",
      ),
    severity:
      normalizeStatus(
        input.severity,
      ) as SecurityEvent["severity"],
    subjectId:
      typeof input.subjectId === "string"
        ? input.subjectId
        : typeof input.subject_id === "string"
          ? input.subject_id
          : undefined,
    propertyId:
      typeof input.propertyId === "string"
        ? input.propertyId
        : typeof input.property_id === "string"
          ? input.property_id
          : undefined,
    leaseId:
      typeof input.leaseId === "string"
        ? input.leaseId
        : typeof input.lease_id === "string"
          ? input.lease_id
          : undefined,
    lockId:
      typeof input.lockId === "string"
        ? input.lockId
        : typeof input.lock_id === "string"
          ? input.lock_id
          : undefined,
    message:
      String(input.message ?? ""),
    occurredAt:
      String(
        input.occurredAt ??
          input.occurred_at ??
          "",
      ),
    correlationId:
      typeof input.correlationId === "string"
        ? input.correlationId
        : typeof input.correlation_id === "string"
          ? input.correlation_id
          : undefined,
  }
}
