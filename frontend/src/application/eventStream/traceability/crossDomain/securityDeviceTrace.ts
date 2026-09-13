import {
  selectCommandEventTrace,
} from "../../selectors/selectCommandEventTrace";

export function getSecurityDeviceTrace() {
  return selectCommandEventTrace(
    "device.reconcile",
  );
}
