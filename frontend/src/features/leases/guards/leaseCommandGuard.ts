export function leaseCommandGuard(
  command: string,
): boolean {
  return command === "refresh" || command === "inspect"
}
