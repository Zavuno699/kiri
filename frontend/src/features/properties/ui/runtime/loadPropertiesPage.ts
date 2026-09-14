import {
  loadDomainPage,
} from "../../../../application/ui/runtime/loadDomainPage";

import {
  listPropertiesApi,
} from "../../api/runtime/listPropertiesApi";

export async function loadPropertiesPage() {
  return loadDomainPage(
    "properties",
    async () => {
      const response =
        await listPropertiesApi();

      return response.data;
    },
  );
}
