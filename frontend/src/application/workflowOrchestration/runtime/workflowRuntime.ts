import {
  leasePaymentWorkflow,
} from "../steps/registerLeasePaymentWorkflow";

import {
  deviceLeaseWorkflow,
} from "../steps/registerDeviceLeaseWorkflow";

import {
  lockLeaseWorkflow,
} from "../steps/registerLockLeaseWorkflow";

import {
  securityRecoveryWorkflow,
} from "../steps/registerSecurityRecoveryWorkflow";

import {
  setWorkflowState,
} from "../state/workflowStore";

import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

const definitions: WorkflowDefinition[] = [
  leasePaymentWorkflow,
  deviceLeaseWorkflow,
  lockLeaseWorkflow,
  securityRecoveryWorkflow,
];

export function initializeWorkflowOrchestration(): void {
  setWorkflowState({
    initialized: true,
    definitions: definitions.map(
      (definition) => definition.id,
    ),
    executions: [],
    activeWorkflowId: null,
  });
}
