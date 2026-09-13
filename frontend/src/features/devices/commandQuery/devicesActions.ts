import {
  selectActionDescriptors,
} from "../../../application/commandQuery/selectors/selectActionDescriptors";

export function getDevicesActions(
  entityId: string | null = null,
) {
  return selectActionDescriptors(
    "devices",
    entityId,
  );
}
