import type { RoleKey } from "../types";

export interface RBACState {
  initialized: boolean;
  roles: RoleKey[];
  effectiveCapabilities: string[];
  loading: boolean;
  error: string | null;
}
