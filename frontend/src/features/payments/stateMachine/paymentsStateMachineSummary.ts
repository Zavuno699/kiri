import {
  getPaymentsStateMachineDefinition,
} from "../../../application/stateMachine/adapters/paymentsStateMachineAdapter";

export function getPaymentsStateMachineSummary() {
  return getPaymentsStateMachineDefinition();
}
