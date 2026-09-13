
export interface SecurityFeaturePolicy {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function defaultSecurityFeaturePolicy(): SecurityFeaturePolicy {
  return {
    readable: false,
    writable: false,
    commandable: false,
  };
}

