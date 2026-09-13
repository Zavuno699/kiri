import {
  loadDomainPage,
} from "../../../application/ui/runtime/loadDomainPage";

import {
  listLeasesApi,
} from "../../leases/api/runtime/listLeasesApi";

export async function loadLeasesPage() {
  return loadDomainPage(
    "leases",
    async () => {
      const response =
        await listLeasesApi();

      return response.data;
    },
  );
}
