import {
  registerCanonicalProjections,
} from "../registry/registerCanonicalProjections";

export function initializeCanonicalProjections(): void {
  registerCanonicalProjections();
}
