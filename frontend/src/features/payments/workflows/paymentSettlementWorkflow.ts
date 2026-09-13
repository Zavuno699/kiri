import type { WorkflowDefinition } from "../../../application/workflows/workflowDefinition"

export interface PaymentSettlementContext {
  paymentId: string
  settled: boolean
  entitlementCalculated: boolean
}

export const paymentSettlementWorkflow:
  WorkflowDefinition<PaymentSettlementContext> = {
    id: "payment.settlement",
    steps: [
      {
        id: "settle",
        async execute(context) {
          return {
            ...context,
            settled: context.paymentId.length > 0,
          }
        },
      },
      {
        id: "entitlement",
        async execute(context) {
          return {
            ...context,
            entitlementCalculated:
              context.settled,
          }
        },
      },
    ],
  }
