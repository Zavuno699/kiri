export function canMigrateProjection(
  rebuildRequired: boolean,
  rebuildAllowed: boolean,
): boolean {
  if (rebuildRequired) {
    return rebuildAllowed;
  }

  return true;
}
