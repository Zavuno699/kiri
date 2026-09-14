import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function leasesCommandAuthorized(): boolean {
  return actionAllowed("lease.edit");
}
