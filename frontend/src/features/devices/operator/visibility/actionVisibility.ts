import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function devicesActionVisible(): boolean {
  return actionAllowed("device.command");
}
