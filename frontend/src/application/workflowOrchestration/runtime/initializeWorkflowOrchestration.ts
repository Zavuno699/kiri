import {
  registerCanonicalWorkflows,
} from "../workflows/registerCanonicalWorkflows";

import {
  registerCanonicalWorkflowSteps,
} from "../workflows/registerCanonicalWorkflowSteps";

import {
  registerCanonicalCompensation,
} from "../compensation/registerCanonicalCompensation";

let initialized =
  false;

export function initializeWorkflowOrchestration(): void {
  if (initialized) {
    return;
  }

  initialized =
    true;

  registerCanonicalWorkflows();
  registerCanonicalWorkflowSteps();
  registerCanonicalCompensation();
}
