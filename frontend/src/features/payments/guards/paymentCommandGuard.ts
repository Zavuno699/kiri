export function paymentCommandGuard(
  command: string,
): boolean {
  return command === "refresh" || command === "inspect"
}
