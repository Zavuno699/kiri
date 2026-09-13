import {
  selectActionDescriptors,
} from "../../../application/commandQuery/selectors/selectActionDescriptors";

export function getLocksActions(
  entityId: string | null = null,
) {
  return selectActionDescriptors(
    "locks",
    entityId,
  );
}
