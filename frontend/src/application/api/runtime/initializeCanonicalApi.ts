import {
  initializeApiResourceRegistry,
} from "../resources/resourceRegistry";

import {
  markApiInitialized,
} from "../state/markApiInitialized";

export function initializeCanonicalApi(): void {
  initializeApiResourceRegistry();
  markApiInitialized();
}
