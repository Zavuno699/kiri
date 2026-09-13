export function dashboardCommandGuard(
  command: string,
): boolean {
  return command === "refresh" || command === "inspect"
}
