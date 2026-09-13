import {
  getDevicesStateMachineDefinition,
} from "../../../application/stateMachine/adapters/devicesStateMachineAdapter";

export function getDevicesStateMachineSummary() {
  return getDevicesStateMachineDefinition();
}
