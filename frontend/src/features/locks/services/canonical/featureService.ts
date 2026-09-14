import {
  locksApiClient,
} from "../../api/canonical/clients/client";

export const locksCanonicalService = {
  list: () =>
    locksApiClient.list(),

  get: (
    id: string,
  ) =>
    locksApiClient.get(id),
};
