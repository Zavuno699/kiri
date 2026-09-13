import { securityActionVisible } from "../visibility/actionVisibility";

export function canUseSecurityOperatorAction(): boolean {
  return securityActionVisible();
}
