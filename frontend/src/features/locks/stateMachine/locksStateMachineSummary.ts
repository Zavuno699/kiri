import {
  getLocksStateMachineDefinition,
} from "../../../application/stateMachine/adapters/locksStateMachineAdapter";

export function getLocksStateMachineSummary() {
  return getLocksStateMachineDefinition();
}
