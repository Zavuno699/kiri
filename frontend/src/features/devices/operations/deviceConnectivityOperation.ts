export function deviceConnectivityLabel(
  online?: boolean,
): string {
  if (online === undefined) return "Unknown"
  return online ? "Online" : "Offline"
}
