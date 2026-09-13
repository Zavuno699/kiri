import {
  devicesConsistencyCheck,
} from "../checks/domainConsistencyCheck";

export function refreshDevicesConsistency() {
  return devicesConsistencyCheck();
}
