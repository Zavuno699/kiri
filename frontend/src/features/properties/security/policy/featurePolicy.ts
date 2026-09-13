
export interface PropertiesFeaturePolicy {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function defaultPropertiesFeaturePolicy(): PropertiesFeaturePolicy {
  return {
    readable: false,
    writable: false,
    commandable: false,
  };
}

