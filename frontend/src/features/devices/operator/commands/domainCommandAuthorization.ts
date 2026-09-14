import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function devicesCommandAuthorized(): boolean {
  return actionAllowed("device.command");
}
