export interface LeasesAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function getLeasesAccessState(): LeasesAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
