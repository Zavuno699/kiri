import {
  orchestrateAndAuditWorkflow,
} from "../runtime/orchestrateAndAuditWorkflow";

export function activateLeaseWorkflow(
  entityId: string | null,
) {
  return orchestrateAndAuditWorkflow({
    workflowId:
      "property-to-lease-activation",
    entityId,
    parameters:
      {
        active:
          true,
      },
    confirmed:
      true,
    subjectId:
      "operator",
    correlationId:
      crypto.randomUUID(),
  });
}
