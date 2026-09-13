import {
  listProjections,
} from "../registry/projectionRegistry";

import {
  listResourceStates,
} from "../state/resourceStateStore";

export function getProjectionDiagnostics() {
  return {
    projectionCount:
      listProjections().length,
    resourceStateCount:
      listResourceStates().length,

    projections:
      listProjections()
        .map(
          (projection) => ({
            key:
              projection.key,
            domain:
              projection.domain,
            resourceKey:
              projection.resourceKey,
          }),
        ),

    resourceStates:
      listResourceStates()
        .map(
          (state) => ({
            domain:
              state.domain,
            resourceKey:
              state.resourceKey,
            status:
              state.status,
            version:
              state.version,
            updatedAt:
              state.updatedAt,
            hasData:
              state.data !== null,
          }),
        ),
  };
}
