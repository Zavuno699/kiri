export function normalizeProjectionState(
  state: unknown,
): unknown {
  if (state === null || state === undefined) {
    return {};
  }

  if (Array.isArray(state)) {
    return [...state];
  }

  if (typeof state !== "object") {
    return state;
  }

  return {
    ...(state as Record<string, unknown>),
  };
}
