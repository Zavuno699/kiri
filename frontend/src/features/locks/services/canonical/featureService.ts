import {
  locksApiClient,
} from "../../api/canonical/clients/client";

export const locksCanonicalService = {
  list: (
    context?: Parameters<
      typeof locksApiClient.list
    >[0],
  ) =>
    locksApiClient.list(
      context,
    ),

  get: (
    id: string,
    context?: Parameters<
      typeof locksApiClient.get
    >[1],
  ) =>
    locksApiClient.get(
      id,
      context,
    ),
};
