import {
  getStateSlice,
  registerStateSlice,
} from "../registry/stateSliceRegistry";

export function setStateSlice(
  domain: string,
  data: unknown,
): void {
  const current =
    getStateSlice(
      domain,
    );

  if (!current) {
    registerStateSlice({
      key:
        domain,
      domain,
      data,
      version:
        1,
      updatedAt:
        new Date().toISOString(),
    });

    return;
  }

  registerStateSlice({
    ...current,
    data,
    version:
      current.version + 1,
    updatedAt:
      new Date().toISOString(),
  });
}
