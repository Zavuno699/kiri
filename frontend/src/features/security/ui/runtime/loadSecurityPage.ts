import {
  loadDomainPage,
} from "../../../application/ui/runtime/loadDomainPage";

import {
  listSecurityApi,
} from "../../security/api/runtime/listSecurityApi";

export async function loadSecurityPage() {
  return loadDomainPage(
    "security",
    async () => {
      const response =
        await listSecurityApi();

      return response.data;
    },
  );
}
