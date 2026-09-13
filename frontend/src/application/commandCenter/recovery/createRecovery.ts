import {
  registerRecovery,
} from "./recoveryStore";

export function createRecovery(
  input: {
    incidentId?: string | null;
    domain: string;
    action: string;
    reason?: string | null;
  },
) {
  const recovery = {
    id:
      `recovery:${Date.now()}`,
    incidentId:
      input.incidentId ??
      null,
    domain:
      input.domain,
    action:
      input.action,
    status:
      "prepared" as const,
    startedAt:
      null,
    completedAt:
      null,
    reason:
      input.reason ??
      null,
  };

  registerRecovery(
    recovery,
  );

  return recovery;
}
