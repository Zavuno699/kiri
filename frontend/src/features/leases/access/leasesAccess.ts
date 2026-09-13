import {
  getLeasesAccessState,
} from "./leasesAccessState"

export function canReadLeases(): boolean {
  return getLeasesAccessState().readable
}

export function canWriteLeases(): boolean {
  return getLeasesAccessState().writable
}
