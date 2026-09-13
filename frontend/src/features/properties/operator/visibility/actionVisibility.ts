import { actionAllowed } from "../../../application/operatorActions/guards/actionGuard";

export function propertiesActionVisible(): boolean {
  return actionAllowed("property.edit");
}
