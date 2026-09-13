import {
  coordinateCachedRead,
} from "../../../application/persistence/runtime/coordinateRead";

import {
  coordinateRefresh,
} from "../../../application/persistence/runtime/coordinateRefresh";

import {
  coordinateMutation,
} from "../../../application/persistence/runtime/coordinateMutation";

export const locksPersistenceFacade = {
  read<T = unknown>() {
    return coordinateCachedRead<T>(
      "locks",
      "locks",
    );
  },

  refresh<T = unknown>(
    query: unknown,
  ) {
    return coordinateRefresh<T>(
      "locks",
      "locks",
      query,
    );
  },

  mutate<TResult = unknown>(
    command: unknown,
    capability?: string,
  ) {
    return coordinateMutation<TResult>(
      "locks",
      "locks",
      command,
      capability,
    );
  },
};
