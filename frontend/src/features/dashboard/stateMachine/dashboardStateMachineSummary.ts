import {
  getDashboardStateMachineDefinition,
} from "../../../application/stateMachine/adapters/dashboardStateMachineAdapter";

export function getDashboardStateMachineSummary() {
  return getDashboardStateMachineDefinition();
}
