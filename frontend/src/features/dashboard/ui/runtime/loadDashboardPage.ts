import {
  loadDomainPage,
} from "../../../application/ui/runtime/loadDomainPage";

import {
  listDashboardApi,
} from "../../dashboard/api/runtime/listDashboardApi";

export async function loadDashboardPage() {
  return loadDomainPage(
    "dashboard",
    async () => {
      const response =
        await listDashboardApi();

      return response.data;
    },
  );
}
