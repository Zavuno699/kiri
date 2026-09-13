import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

export const securityRecoveryWorkflow: WorkflowDefinition = {
  key: "security-recovery",
  name: "Security runtime recovery",
  domains: [
    "security",
    "dashboard",
  ],
  steps: [
    {
      key: "security-runtime-recovered",
      domain: "security",
      required: true,
      reversible: false,
    },
    {
      key: "operator-state-refreshed",
      domain: "dashboard",
      required: true,
      reversible: false,
    },
  ],
};
