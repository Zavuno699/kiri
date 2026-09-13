import {
  recordEventAudit,
} from "../runtime/recordEventAudit";

export function observeEvent(
  eventType: string,
  domain: string,
  entityId: string | null,
  correlationId: string | null,
  causationId: string | null,
  message: string,
) {
  return recordEventAudit({
    eventType,
    domain,
    entityId,
    correlationId,
    causationId,
    message,
  });
}
