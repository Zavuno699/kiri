export interface PropertiesAccessState {
  read: boolean
  write: boolean
  reason: string | null
}

export function resolvePropertiesAccess(): PropertiesAccessState {
  return {
    read: true,
    write: false,
    reason: null,
  }
}
