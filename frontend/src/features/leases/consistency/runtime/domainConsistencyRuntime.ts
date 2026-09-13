import {
  leasesConsistencyCheck,
} from "../checks/domainConsistencyCheck";

export function refreshLeasesConsistency() {
  return leasesConsistencyCheck();
}
