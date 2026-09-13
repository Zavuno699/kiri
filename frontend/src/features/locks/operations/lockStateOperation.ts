export function lockStateLabel(
  locked?: boolean,
): string {
  if (locked === undefined) return "Unknown"
  return locked ? "Locked" : "Unlocked"
}
