import type { PermissionLevel, PermissionScope } from "../types";

export interface RBACCapability {
  key: string;
  domain: string;
  level: PermissionLevel;
  scope: PermissionScope;
  dangerous: boolean;
  mutating: boolean;
  description: string;
  active: boolean;
}
