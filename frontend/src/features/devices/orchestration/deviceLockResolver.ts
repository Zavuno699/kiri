export function resolveDeviceLock(
  device: Record<string, unknown>,
): string | undefined {
  const value =
    device.lockId ??
    device.lock_id

  return typeof value === "string"
    ? value
    : undefined
}
