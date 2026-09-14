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
    const projectionDef = projection as any;
    current = projectionDef.initialState || {
      data: null,
      version: 0,
    };

    registerResourceState(
      current as any,
    );
  }

  const projected =
    projection.project(
      current as any,
      update.payload,
    );

  setResourceState(
    projected as any,
  );
}
