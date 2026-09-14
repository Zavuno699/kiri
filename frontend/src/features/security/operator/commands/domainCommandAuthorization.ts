import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function securityCommandAuthorized(): boolean {
  return actionAllowed("security.admin");
}
