import {
  WorkflowWorkbenchHeader,
} from "./header/WorkflowWorkbenchHeader";

import {
  WorkflowList,
} from "./workflows/WorkflowList";

import {
  WorkflowStepList,
} from "./steps/WorkflowStepList";

import {
  WorkflowTransactionPanel,
} from "./transaction/WorkflowTransactionPanel";

import {
  CompensationPanel,
} from "./compensation/CompensationPanel";

import {
  WorkflowStatus,
} from "./status/WorkflowStatus";

interface Props {
  workflowId?: string;
  domain?: string;
  entityId?: string | null;
}

export function WorkflowOrchestrationWorkbench({
  workflowId =
    "lease-lock-authorization",
  domain =
    "locks",
  entityId =
    null,
}: Props) {
  return (
    <section className="space-y-4">
      <WorkflowWorkbenchHeader />

      <div className="grid gap-4 lg:grid-cols-2">
        <WorkflowList
          domain={
            domain
          }
        />

        <WorkflowStepList
          workflowId={
            workflowId
          }
        />
      </div>

      <WorkflowTransactionPanel
        workflowId={
          workflowId
        }
        entityId={
          entityId
        }
      />

      <CompensationPanel
        workflowId={
          workflowId
        }
      />

      <WorkflowStatus />
    </section>
  );
}
