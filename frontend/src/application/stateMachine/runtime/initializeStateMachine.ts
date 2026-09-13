import {
  registerCanonicalStates,
} from "../states/registerCanonicalStates";

import {
  registerCanonicalTransitions,
} from "../transitions/registerCanonicalTransitions";

import {
  registerCanonicalGuards,
} from "../guards/guardRegistry";

import {
  registerCanonicalInvariants,
} from "../invariants/invariantRegistry";

let initialized =
  false;

export function initializeStateMachine(): void {
  if (initialized) {
    return;
  }

  initialized =
    true;

  registerCanonicalStates();
  registerCanonicalTransitions();
  registerCanonicalGuards();
  registerCanonicalInvariants();
}
