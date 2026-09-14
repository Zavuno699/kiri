import {
  propertiesApiClient,
} from "../../api/canonical/clients/client";

export const propertiesCanonicalService = {
  list: () =>
    propertiesApiClient.list(),

  get: (
    id: string,
  ) =>
    propertiesApiClient.get(id),
};
