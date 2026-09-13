
export interface DevicesSecuritySelection {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function selectDevicesSecurity(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
): DevicesSecuritySelection {
  return {
    readable,
    writable,
    commandable,
  };
}

