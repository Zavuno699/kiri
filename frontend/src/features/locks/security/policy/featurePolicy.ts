
export interface LocksFeaturePolicy {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function defaultLocksFeaturePolicy(): LocksFeaturePolicy {
  return {
    readable: false,
    writable: false,
    commandable: false,
  };
}

