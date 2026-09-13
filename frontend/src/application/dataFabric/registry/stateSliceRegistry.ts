export type StateSliceDefinition = {
  key: string;
  domain: string;
};

const slices = new Map<
  string,
  StateSliceDefinition
>();

export function registerStateSlice(
  definition: StateSliceDefinition,
): void {
  slices.set(definition.key, definition);
}

export function getStateSlice(
  key: string,
): StateSliceDefinition | undefined {
  return slices.get(key);
}

export function listStateSlices(): StateSliceDefinition[] {
  return Array.from(slices.values());
}
