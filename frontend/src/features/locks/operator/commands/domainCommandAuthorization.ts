import { actionAllowed } from "../../../application/operatorActions/guards/actionGuard";

export function locksCommandAuthorized(): boolean {
  return actionAllowed("lock.command");
}
