
export interface LeasesFeaturePolicy {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function defaultLeasesFeaturePolicy(): LeasesFeaturePolicy {
  return {
    readable: false,
    writable: false,
    commandable: false,
  };
}

