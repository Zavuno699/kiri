import {
  getLeasesStateMachineDefinition,
} from "../../../application/stateMachine/adapters/leasesStateMachineAdapter";

export function getLeasesStateMachineSummary() {
  return getLeasesStateMachineDefinition();
}
