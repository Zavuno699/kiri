import {
  registerCanonicalCapabilities,
} from "../capabilities/registerCapabilities";

import {
  registerCanonicalPolicies,
} from "../policy/registerPolicies";

export function initializeSecurityRuntime(): void {
  registerCanonicalCapabilities();
  registerCanonicalPolicies();
}
