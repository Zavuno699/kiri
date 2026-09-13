export function isDeviceProjectionFresh(
  lastSeenAt: string | undefined,
  thresholdMs = 60_000,
  now = Date.now(),
): boolean {
  if (!lastSeenAt) return false;
  return now - Date.parse(lastSeenAt) <= thresholdMs;
}
