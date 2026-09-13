import {
  selectActionDescriptors,
} from "../../../application/commandQuery/selectors/selectActionDescriptors";

export function getPaymentsActions(
  entityId: string | null = null,
) {
  return selectActionDescriptors(
    "payments",
    entityId,
  );
}
