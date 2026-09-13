
import type { IdentityContext } from "./identityContext";

export interface IdentityState {
  context: IdentityContext;
  loading: boolean;
  error: string | null;
}

