import {
  selectCommandEventTrace,
} from "../../selectors/selectCommandEventTrace";

export function getSecurityLockTrace() {
  return selectCommandEventTrace(
    "lock.release",
  );
}
