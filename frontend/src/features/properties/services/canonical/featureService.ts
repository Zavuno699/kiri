import {
  propertiesApiClient,
} from "../../api/canonical/clients/client";

export const propertiesCanonicalService = {
  list: (
    context?: Parameters<
      typeof propertiesApiClient.list
    >[0],
  ) =>
    propertiesApiClient.list(
      context,
    ),

  get: (
    id: string,
    context?: Parameters<
      typeof propertiesApiClient.get
    >[1],
  ) =>
    propertiesApiClient.get(
      id,
      context,
    ),
};
