export function propertyCommandGuard(
  command: string,
): boolean {
  return command === "refresh" || command === "inspect"
}
