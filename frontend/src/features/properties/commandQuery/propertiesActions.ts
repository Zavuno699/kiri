import {
  selectActionDescriptors,
} from "../../../application/commandQuery/selectors/selectActionDescriptors";

export function getPropertiesActions(
  entityId: string | null = null,
) {
  return selectActionDescriptors(
    "properties",
    entityId,
  );
}
