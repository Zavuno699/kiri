import { actionAllowed } from "../../../application/operatorActions/guards/actionGuard";

export function securityActionVisible(): boolean {
  return actionAllowed("security.admin");
}
