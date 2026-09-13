import {
  selectActionDescriptors,
} from "../../../application/commandQuery/selectors/selectActionDescriptors";

export function getSecurityActions(
  entityId: string | null = null,
) {
  return selectActionDescriptors(
    "security",
    entityId,
  );
}
