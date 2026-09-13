import {
  recordProjectionAudit,
} from "../runtime/recordProjectionAudit";

export function observeProjection(
  projectionId: string,
  domain: string,
  entityId: string | null,
  correlationId: string | null,
  message: string,
) {
  return recordProjectionAudit({
    projectionId,
    domain,
    entityId,
    correlationId,
    message,
  });
}
