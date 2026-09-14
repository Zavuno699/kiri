import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function locksActionVisible(): boolean {
  return actionAllowed("lock.command");
}
