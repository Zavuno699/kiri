import {
  registerProjection,
} from "../registry/projectionRegistry";

import {
  registerResourceState,
} from "../state/resourceStateStore";

import type {
  ProjectionDefinition,
} from "../contracts/projectionDefinition";

export function createDomainProjection<T>(
  domain: string,
  resourceKey: string,
  initialData: T | null = null,
): ProjectionDefinition<T> {
  const definition:
    ProjectionDefinition<T> = {
      key:
        `${domain}.${resourceKey}`,
      domain,
      resourceKey,

      initialState: {
        domain,
        resourceKey,
        data: initialData,
        status: "idle",
        version: 0,
        updatedAt: null,
        error: null,
      },

      project:
        (
          state,
          payload,
        ) => ({
          ...state,
          data:
            payload as T,
          status: "ready",
          version:
            state.version + 1,
          updatedAt:
            new Date().toISOString(),
          error: null,
        }),
    };

  registerProjection(
    definition,
  );

  registerResourceState(
    definition.initialState,
  );

  return definition;
}
