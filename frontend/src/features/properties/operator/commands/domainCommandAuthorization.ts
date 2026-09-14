import { actionAllowed } from "../../../../application/operatorActions/guards/actionGuard";

export function propertiesCommandAuthorized(): boolean {
  return actionAllowed("property.edit");
}
