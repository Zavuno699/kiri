import {
  orchestrateAndAuditWorkflow,
} from "../runtime/orchestrateAndAuditWorkflow";

export function authorizeLeaseLockWorkflow(
  entityId: string | null,
) {
  return orchestrateAndAuditWorkflow({
    workflowId:
      "lease-lock-authorization",
    entityId,
    parameters:
      {
        active:
          true,
        operational:
          true,
        controllable:
          true,
        frozen:
          false,
      },
    confirmed:
      true,
    subjectId:
      "operator",
    correlationId:
      crypto.randomUUID(),
  });
}
