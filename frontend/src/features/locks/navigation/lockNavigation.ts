export interface LockNavigation {
  label: string
  path: string
  enabled: boolean
}

export const lockNavigation: LockNavigation = {
  label: "Locks",
  path: "/locks",
  enabled: true,
}
