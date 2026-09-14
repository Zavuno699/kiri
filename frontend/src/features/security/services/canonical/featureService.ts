import {
  securityApiClient,
} from "../../api/canonical/clients/client";

export const securityCanonicalService = {
  list: () =>
    securityApiClient.list(),

  get: (
    id: string,
  ) =>
    securityApiClient.get(id),
};
