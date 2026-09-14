import {
  loadDomainPage,
} from "../../../../application/ui/runtime/loadDomainPage";

import {
  listLocksApi,
} from "../../api/runtime/listLocksApi";

export async function loadLocksPage() {
  return loadDomainPage(
    "locks",
    async () => {
      const response =
        await listLocksApi();

      return response.data;
    },
  );
}
