
export interface PropertiesSecuritySelection {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
}

export function selectPropertiesSecurity(
  readable: boolean,
  writable: boolean,
  commandable: boolean,
): PropertiesSecuritySelection {
  return {
    readable,
    writable,
    commandable,
  };
}

