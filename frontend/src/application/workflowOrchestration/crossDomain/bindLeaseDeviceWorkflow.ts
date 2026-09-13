import {
  orchestrateAndAuditWorkflow,
} from "../runtime/orchestrateAndAuditWorkflow";

export function bindLeaseDeviceWorkflow(
  entityId: string | null,
) {
  return orchestrateAndAuditWorkflow({
    workflowId:
      "lease-device-binding",
    entityId,
    parameters:
      {
        operational:
          true,
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
