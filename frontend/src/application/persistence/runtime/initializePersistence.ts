import {
  registerCanonicalPersistence,
} from "../registry/registerCanonicalPersistence";

import {
  registerCanonicalInvalidationRules,
} from "../registry/registerCanonicalInvalidationRules";

import {
  registerCrossDomainInvalidation,
} from "../invalidation/registerCrossDomainInvalidation";

export function initializePersistenceRuntime(): void {
  registerCanonicalPersistence();
  registerCanonicalInvalidationRules();
  registerCrossDomainInvalidation();
}
