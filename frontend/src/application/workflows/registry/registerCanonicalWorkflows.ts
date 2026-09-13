import {
  registerWorkflow,
} from "./workflowRegistry";

import {
  executeLeasePaymentWorkflow,
} from "../canonical/leasePayment/leasePaymentWorkflow";

import {
  executeLeaseDeviceWorkflow,
} from "../canonical/leaseDevice/leaseDeviceWorkflow";

import {
  executeLeaseLockWorkflow,
} from "../canonical/leaseLock/leaseLockWorkflow";

import {
  executeSecurityRecoveryWorkflow,
} from "../canonical/securityRecovery/securityRecoveryWorkflow";

import {
  executeDashboardRefreshWorkflow,
} from "../canonical/dashboardRefresh/dashboardRefreshWorkflow";

export function registerCanonicalWorkflows(): void {
  registerWorkflow({
    key:
      "workflow.leasePayment",
    execute:
      executeLeasePaymentWorkflow,
  });

  registerWorkflow({
    key:
      "workflow.leaseDevice",
    execute:
      executeLeaseDeviceWorkflow,
  });

  registerWorkflow({
    key:
      "workflow.leaseLock",
    execute:
      executeLeaseLockWorkflow,
  });

  registerWorkflow({
    key:
      "workflow.securityRecovery",
    execute:
      executeSecurityRecoveryWorkflow,
  });

  registerWorkflow({
    key:
      "workflow.dashboardRefresh",
    execute:
      executeDashboardRefreshWorkflow,
  });
}
