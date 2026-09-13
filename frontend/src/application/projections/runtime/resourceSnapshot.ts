import {
  listResourceStates,
} from "../state/resourceStateStore";

export function getResourceStateSnapshot() {
  return listResourceStates().map(
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
      error:
        state.error,
      hasData:
        state.data !== null,
    }),
  );
}
