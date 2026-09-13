import {
  securityConsistencyCheck,
} from "../checks/domainConsistencyCheck";

export function refreshSecurityConsistency() {
  return securityConsistencyCheck();
}
