import { actionAllowed } from "../../../application/operatorActions/guards/actionGuard";

export function leasesActionVisible(): boolean {
  return actionAllowed("lease.edit");
}
