import {
  registerCanonicalApiResources,
} from "./registerCanonicalApiResources";

import {
  registerCanonicalApiOperations,
} from "./registerCanonicalApiOperations";

export function initializeCanonicalApi(): void {
  registerCanonicalApiResources();
  registerCanonicalApiOperations();
}
