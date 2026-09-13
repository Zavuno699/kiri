import {
  registerCanonicalEvents,
} from "../registry/registerCanonicalEvents";

import {
  registerCanonicalProjections,
} from "../registry/registerCanonicalProjections";

import {
  registerCanonicalCommandEventLinks,
} from "../traceability/registerCanonicalCommandEventLinks";

import {
  registerCanonicalEventProjectionLinks,
} from "../traceability/registerCanonicalEventProjectionLinks";

let initialized =
  false;

export function initializeEventStream(): void {
  if (initialized) {
    return;
  }

  initialized =
    true;

  registerCanonicalEvents();
  registerCanonicalProjections();
  registerCanonicalCommandEventLinks();
  registerCanonicalEventProjectionLinks();
}
