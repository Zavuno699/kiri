export interface DeviceCommandController {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}

export function createDeviceCommandController(
  dispatch: (
    type: string,
    payload?: unknown,
  ) => Promise<unknown>,
): DeviceCommandController {
  return {
    dispatch,
  }
}
