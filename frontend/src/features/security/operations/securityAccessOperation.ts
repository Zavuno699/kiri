export function securityAccessLabel(
  granted?: boolean,
): string {
  if (granted === undefined) return "Unknown"
  return granted ? "Granted" : "Denied"
}
