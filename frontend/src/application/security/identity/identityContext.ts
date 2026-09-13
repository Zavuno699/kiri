
import type { OperatorIdentity } from "./operatorIdentity";

export interface IdentityContext {
  identity: OperatorIdentity | null;
  authenticated: boolean;
  principal: string | null;
  tenantId: string | null;
  organizationId: string | null;
}

