import { devicesActionVisible } from "../visibility/actionVisibility";

export function canUseDevicesOperatorAction(): boolean {
  return devicesActionVisible();
}
