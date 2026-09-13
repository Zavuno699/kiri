import {
  orchestrateAndAuditWorkflow,
} from "../runtime/orchestrateAndAuditWorkflow";

export function recoverSecurityLockWorkflow(
  entityId: string | null,
) {
  return orchestrateAndAuditWorkflow({
    workflowId:
      "security-lock-recovery",
    entityId,
    parameters:
      {
        controllable:
          true,
        frozen:
          false,
      },
    confirmed:
      true,
    subjectId:
      "security-operator",
    correlationId:
      crypto.randomUUID(),
  });
}
