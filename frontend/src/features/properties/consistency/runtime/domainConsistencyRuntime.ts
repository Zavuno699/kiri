import {
  propertiesConsistencyCheck,
} from "../checks/domainConsistencyCheck";

export function refreshPropertiesConsistency() {
  return propertiesConsistencyCheck();
}
