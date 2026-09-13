import type {
  StateSlice,
} from "../contracts/stateSlice";

const slices = new Map<
  string,
  StateSlice
>();

export function registerStateSlice(
  slice: StateSlice,
): void {
  slices.set(
    slice.key,
    slice,
  );
}

export function getStateSlice(
  key: string,
): StateSlice | null {
  return (
    slices.get(key) ??
    null
  );
}

export function listStateSlices(): StateSlice[] {
  return [
    ...slices.values(),
  ];
}
