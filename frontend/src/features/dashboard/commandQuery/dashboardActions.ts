import {
  selectActionDescriptors,
} from "../../../application/commandQuery/selectors/selectActionDescriptors";

export function getDashboardActions(
  entityId: string | null = null,
) {
  return selectActionDescriptors(
    "dashboard",
    entityId,
  );
}
