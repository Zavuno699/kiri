import {
  getSecurityStateMachineDefinition,
} from "../../../application/stateMachine/adapters/securityStateMachineAdapter";

export function getSecurityStateMachineSummary() {
  return getSecurityStateMachineDefinition();
}
