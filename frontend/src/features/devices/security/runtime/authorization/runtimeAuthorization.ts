export interface DevicesRuntimeAuthorization {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  reason: string | null;
}

export function createDevicesRuntimeAuthorization(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
  reason: string | null,
): DevicesRuntimeAuthorization {
  return {
    readable,
    writable,
    commandable,
    reason,
  };
}
