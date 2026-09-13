import {
  getSecurityMode,
} from "../state/securityModeStore";

import {
  getSecurityPrincipal,
} from "../state/securityPrincipalStore";

import {
  getSecuritySession,
} from "../state/securitySessionStore";

import {
  getSecurityFreezeState,
} from "../state/securityFreezeStore";

import {
  listCapabilities,
} from "../registry/capabilityRegistry";

import {
  listSecurityPolicies,
} from "../registry/policyRegistry";

import {
  listSecurityAuditRecords,
} from "../telemetry/securityAuditStore";

import {
  listCredentials,
} from "../state/securityCredentialStore";

export function getSecurityDiagnostics() {
  return {
    mode:
      getSecurityMode(),

    principal:
      getSecurityPrincipal(),

    session:
      getSecuritySession(),

    freeze:
      getSecurityFreezeState(),

    capabilityCount:
      listCapabilities().length,

    policyCount:
      listSecurityPolicies().length,

    credentialCount:
      listCredentials().length,

    auditCount:
      listSecurityAuditRecords().length,

    recentAudit:
      listSecurityAuditRecords().slice(-25),
  };
}
