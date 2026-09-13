import {
  registerCanonicalCommands,
} from "../registry/registerCanonicalCommands";

import {
  registerCanonicalQueries,
} from "../registry/registerCanonicalQueries";

let initialized =
  false;

export function initializeCommandQuery(): void {
  if (initialized) {
    return;
  }

  initialized =
    true;

  registerCanonicalCommands();
  registerCanonicalQueries();
}
