import {
  securityRuntimeIntegrityCheck,
} from "../checks/securityRuntimeCheck";

import {
  rbacIntegrityCheck,
} from "../checks/rbacCheck";

import {
  auditIntegrityCheck,
} from "../checks/auditCheck";

import {
  recoveryIntegrityCheck,
} from "../checks/recoveryCheck";

import {
  setIntegrityState,
} from "../state/integrityStore";

export function runIntegrityChecks(): void {
  const checks = [
    securityRuntimeIntegrityCheck(),
    rbacIntegrityCheck(),
    auditIntegrityCheck(),
    recoveryIntegrityCheck(),
  ];

  const pass = checks.filter(
    (check) => check.status === "pass",
  ).length;

  const warn = checks.filter(
    (check) => check.status === "warn",
  ).length;

  const fail = checks.filter(
    (check) => check.status === "fail",
  ).length;

  setIntegrityState({
    initialized: true,
    checks,
    pass,
    warn,
    fail,
    overall:
      fail > 0
        ? "failed"
        : warn > 0
          ? "degraded"
          : "healthy",
  });
}
