import {
  coordinateCachedRead,
} from "../../../application/persistence/runtime/coordinateRead";

import {
  coordinateRefresh,
} from "../../../application/persistence/runtime/coordinateRefresh";

import {
  coordinateMutation,
} from "../../../application/persistence/runtime/coordinateMutation";

export const propertiesPersistenceFacade = {
  read<T = unknown>() {
    return coordinateCachedRead<T>(
      "properties",
      "properties",
    );
  },

  refresh<T = unknown>(
    query: unknown,
  ) {
    return coordinateRefresh<T>(
      "properties",
      "properties",
      query,
    );
  },

  mutate<TResult = unknown>(
    command: unknown,
    capability?: string,
  ) {
    return coordinateMutation<TResult>(
      "properties",
      "properties",
      command,
      capability,
    );
  },
};
