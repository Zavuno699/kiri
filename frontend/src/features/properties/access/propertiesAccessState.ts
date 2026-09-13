export interface PropertiesAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function getPropertiesAccessState(): PropertiesAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
