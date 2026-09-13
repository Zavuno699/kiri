import {
  registerCanonicalWorkflows,
} from "../registry/registerCanonicalWorkflows";

export function initializeCanonicalWorkflows(): void {
  registerCanonicalWorkflows();
}
