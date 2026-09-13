export function canApplyReplayVersion(
  currentVersion: number,
  incomingVersion: number,
): boolean {
  return incomingVersion >= currentVersion;
}
