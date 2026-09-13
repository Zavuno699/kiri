import type {
  CrossDomainContext,
  CrossDomainResult,
} from "../contracts/crossDomainService";

export async function refreshDashboardProjection(
  context?: CrossDomainContext,
): Promise<CrossDomainResult> {
  void context;

  return {
    success: true,
    value: {
      refreshed: true,
      occurredAt:
        new Date().toISOString(),
    },
    reason: null,
  };
}
