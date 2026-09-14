import {
  loadDomainPage,
} from "../../../../application/ui/runtime/loadDomainPage";

import {
  listDevicesApi,
} from "../../api/runtime/listDevicesApi";

export async function loadDevicesPage() {
  return loadDomainPage(
    "devices",
    async () => {
      const response =
        await listDevicesApi();

      return response.data;
    },
  );
}
