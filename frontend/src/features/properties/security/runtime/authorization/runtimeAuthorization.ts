export interface PropertiesRuntimeAuthorization {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  reason: string | null;
}

export function createPropertiesRuntimeAuthorization(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
  reason: string | null,
): PropertiesRuntimeAuthorization {
  return {
    readable,
    writable,
    commandable,
    reason,
  };
}
