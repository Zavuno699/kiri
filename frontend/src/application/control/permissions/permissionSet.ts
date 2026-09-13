import type { Permission } from "./permission"

export interface PermissionSet {
  permissions: Permission[]
  has(
    domain: string,
    action: string,
  ): boolean
}

export function createPermissionSet(
  permissions: Permission[],
): PermissionSet {
  return {
    permissions: [...permissions],

    has(domain, action) {
      return permissions.some(
        (item) =>
          item.domain === domain &&
          item.action === action,
      )
    },
  }
}
