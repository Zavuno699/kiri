import {
  coordinateCachedRead,
} from "../../../application/persistence/runtime/coordinateRead";

import {
  coordinateRefresh,
} from "../../../application/persistence/runtime/coordinateRefresh";

import {
  coordinateMutation,
} from "../../../application/persistence/runtime/coordinateMutation";

export const leasesPersistenceFacade = {
  read<T = unknown>() {
    return coordinateCachedRead<T>(
      "leases",
      "leases",
    );
  },

  refresh<T = unknown>(
    query: unknown,
  ) {
    return coordinateRefresh<T>(
      "leases",
      "leases",
      query,
    );
  },

  mutate<TResult = unknown>(
    command: unknown,
    capability?: string,
  ) {
    return coordinateMutation<TResult>(
      "leases",
      "leases",
      command,
      capability,
    );
  },
};
