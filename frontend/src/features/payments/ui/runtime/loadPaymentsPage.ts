import {
  loadDomainPage,
} from "../../../application/ui/runtime/loadDomainPage";

import {
  listPaymentsApi,
} from "../../payments/api/runtime/listPaymentsApi";

export async function loadPaymentsPage() {
  return loadDomainPage(
    "payments",
    async () => {
      const response =
        await listPaymentsApi();

      return response.data;
    },
  );
}
