import {
  coordinateCachedRead,
} from "../../../application/persistence/runtime/coordinateRead";

import {
  coordinateRefresh,
} from "../../../application/persistence/runtime/coordinateRefresh";

import {
  coordinateMutation,
} from "../../../application/persistence/runtime/coordinateMutation";

export const devicesPersistenceFacade = {
  read<T = unknown>() {
    return coordinateCachedRead<T>(
      "devices",
      "devices",
    );
  },

  refresh<T = unknown>(
    query: unknown,
  ) {
    return coordinateRefresh<T>(
      "devices",
      "devices",
      query,
    );
  },

  mutate<TResult = unknown>(
    command: unknown,
    capability?: string,
  ) {
    return coordinateMutation<TResult>(
      "devices",
      "devices",
      command,
      capability,
    );
  },
};
