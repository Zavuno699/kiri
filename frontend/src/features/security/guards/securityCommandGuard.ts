export function securityCommandGuard(
  command: string,
): boolean {
  return command === "refresh" || command === "inspect"
}
