import {
  coordinateCachedRead,
} from "../../../application/persistence/runtime/coordinateRead";

import {
  coordinateRefresh,
} from "../../../application/persistence/runtime/coordinateRefresh";

import {
  coordinateMutation,
} from "../../../application/persistence/runtime/coordinateMutation";

export const dashboardPersistenceFacade = {
  read<T = unknown>() {
    return coordinateCachedRead<T>(
      "dashboard",
      "dashboard",
    );
  },

  refresh<T = unknown>(
    query: unknown,
  ) {
    return coordinateRefresh<T>(
      "dashboard",
      "dashboard",
      query,
    );
  },

  mutate<TResult = unknown>(
    command: unknown,
    capability?: string,
  ) {
    return coordinateMutation<TResult>(
      "dashboard",
      "dashboard",
      command,
      capability,
    );
  },
};
