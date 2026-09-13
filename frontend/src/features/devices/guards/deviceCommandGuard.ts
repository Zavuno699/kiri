export function deviceCommandGuard(
  command: string,
): boolean {
  return command === "refresh" || command === "inspect"
}
