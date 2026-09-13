import {
  getPropertiesAccessState,
} from "./propertiesAccessState"

export function canReadProperties(): boolean {
  return getPropertiesAccessState().readable
}

export function canWriteProperties(): boolean {
  return getPropertiesAccessState().writable
}
