import { propertiesActionVisible } from "../visibility/actionVisibility";

export function canUsePropertiesOperatorAction(): boolean {
  return propertiesActionVisible();
}
