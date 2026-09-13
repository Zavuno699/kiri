import {
  beginAuditCorrelation,
} from "./correlationContext";

export function withAuditCorrelation<T>(
  operation: () => T,
  causationId?: string | null,
): T {
  beginAuditCorrelation(causationId);
  return operation();
}
