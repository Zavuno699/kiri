import {
  buildConsistencySnapshot,
} from "../engine/buildSnapshot";

import {
  securityConsistencyCheck,
} from "../checks/securityCheck";

import {
  rbacConsistencyCheck,
} from "../checks/rbacCheck";

import {
  auditConsistencyCheck,
} from "../checks/auditCheck";

import {
  recoveryConsistencyCheck,
} from "../checks/recoveryCheck";

import {
  reconciliationConsistencyCheck,
} from "../checks/reconciliationCheck";

import {
  runtimeIntegrityConsistencyCheck,
} from "../checks/runtimeIntegrityCheck";

import {
  setConsistencyState,
} from "../state/consistencyStore";

export function runConsistencyEngine(): void {
  const checks = [
    securityConsistencyCheck(),
    rbacConsistencyCheck(),
    auditConsistencyCheck(),
    recoveryConsistencyCheck(),
    reconciliationConsistencyCheck(),
    runtimeIntegrityConsistencyCheck(),
  ];

  setConsistencyState({
    initialized: true,
    loading: false,
    snapshot: buildConsistencySnapshot(checks),
    error: null,
  });
}
