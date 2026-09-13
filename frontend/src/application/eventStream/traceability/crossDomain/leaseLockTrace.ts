import {
  selectCommandEventTrace,
} from "../../selectors/selectCommandEventTrace";

export function getLeaseLockTrace() {
  return selectCommandEventTrace(
    "lock.secure",
  );
}
