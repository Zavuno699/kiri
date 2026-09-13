import {
  selectCommandEventTrace,
} from "../../selectors/selectCommandEventTrace";

export function getLeaseDeviceTrace() {
  return selectCommandEventTrace(
    "device.refresh",
  );
}
