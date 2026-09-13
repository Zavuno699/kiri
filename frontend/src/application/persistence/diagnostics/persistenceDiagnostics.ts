import {
  listCachePolicies,
} from "../registry/persistenceRegistry";

import {
  listPersistenceEntries,
} from "../cache/persistenceStore";

import {
  listInvalidationRules,
} from "../invalidation/invalidationRegistry";

import {
  listPersistenceOperations,
} from "../operations/persistenceOperationStore";

export function getPersistenceDiagnostics() {
  return {
    policyCount:
      listCachePolicies().length,

    entryCount:
      listPersistenceEntries().length,

    invalidationRuleCount:
      listInvalidationRules().length,

    operationCount:
      listPersistenceOperations().length,

    policies:
      listCachePolicies(),

    entries:
      listPersistenceEntries().map(
        (entry) => ({
          key:
            entry.key,
          domain:
            entry.domain,
          resourceKey:
            entry.resourceKey,
          status:
            entry.status,
          version:
            entry.version,
          cachedAt:
            entry.cachedAt,
          expiresAt:
            entry.expiresAt,
          hasData:
            entry.data !== null,
          error:
            entry.error,
        }),
      ),

    invalidationRules:
      listInvalidationRules(),

    recentOperations:
      listPersistenceOperations().slice(-25),
  };
}
