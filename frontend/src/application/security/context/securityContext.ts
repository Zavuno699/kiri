
import type { PermissionSet } from "../permissions/permissionSet";
import type { IdentityContext } from "../identity/identityContext";
import type { OperatorSession } from "../session/session";

export interface SecurityContextValue {
  identity: IdentityContext;
  session: OperatorSession | null;
  permissions: PermissionSet | null;
  frozen: boolean;
}

