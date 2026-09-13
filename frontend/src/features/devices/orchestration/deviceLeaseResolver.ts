export function resolveDeviceLease(
  device: Record<string, unknown>,
): string | undefined {
  const value =
    device.leaseId ??
    device.lease_id

  return typeof value === "string"
    ? value
    : undefined
}
