import {
  selectActionDescriptors,
} from "../../../application/commandQuery/selectors/selectActionDescriptors";

export function getLeasesActions(
  entityId: string | null = null,
) {
  return selectActionDescriptors(
    "leases",
    entityId,
  );
}
