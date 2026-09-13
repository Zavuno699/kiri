import {
  getProjection,
} from "../registry/projectionRegistry";

import {
  getResourceState,
  registerResourceState,
  setResourceState,
} from "../state/resourceStateStore";

import type {
  ProjectionUpdate,
} from "../contracts/projectionUpdate";

export function applyProjection(
  update: ProjectionUpdate,
): void {
  const projectionKey =
    `${update.domain}.${update.resourceKey}`;

  const projection =
    getProjection(projectionKey);

  if (!projection) {
    return;
  }

  let current =
    getResourceState(
      update.resourceKey,
    );

  if (!current) {
    current =
      projection.initialState;

    registerResourceState(
      current,
    );
  }

  const projected =
    projection.project(
      current,
      update.payload,
    );

  setResourceState(
    projected,
  );
}
