import {
  locksConsistencyCheck,
} from "../checks/domainConsistencyCheck";

export function refreshLocksConsistency() {
  return locksConsistencyCheck();
}
