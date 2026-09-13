
export interface DevicesFeaturePolicy {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function defaultDevicesFeaturePolicy(): DevicesFeaturePolicy {
  return {
    readable: false,
    writable: false,
    commandable: false,
  };
}

