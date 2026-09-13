import {
  orchestrateAndAuditWorkflow,
} from "../runtime/orchestrateAndAuditWorkflow";

export function reconcileLeasePaymentWorkflow(
  entityId: string | null,
) {
  return orchestrateAndAuditWorkflow({
    workflowId:
      "lease-payment-reconciliation",
    entityId,
    parameters:
      {
        consistent:
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
