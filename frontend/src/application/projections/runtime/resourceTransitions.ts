import {
  getResourceState,
  setResourceState,
} from "../state/resourceStateStore";

export function markResourceLoading(
  resourceKey: string,
): void {
  const state =
    getResourceState(resourceKey);

  if (!state) {
    return;
  }

  setResourceState({
    ...state,
    status: "loading",
    error: null,
  });
}

export function markResourceReady(
  resourceKey: string,
  data: unknown,
): void {
  const state =
    getResourceState(resourceKey);

  if (!state) {
    return;
  }

  setResourceState({
    ...state,
    data,
    status: "ready",
    version:
      state.version + 1,
    updatedAt:
      new Date().toISOString(),
    error: null,
  });
}

export function markResourceStale(
  resourceKey: string,
): void {
  const state =
    getResourceState(resourceKey);

  if (!state) {
    return;
  }

  setResourceState({
    ...state,
    status: "stale",
  });
}

export function markResourceError(
  resourceKey: string,
  error: unknown,
): void {
  const state =
    getResourceState(resourceKey);

  if (!state) {
    return;
  }

  setResourceState({
    ...state,
    status: "error",
    error:
      error instanceof Error
        ? error.message
        : String(error),
  });
}
