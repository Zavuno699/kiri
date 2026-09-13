export function lockCommandGuard(
  command: string,
): boolean {
  return command === "refresh" || command === "inspect"
}
