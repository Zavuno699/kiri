export function denyByDefault(
  reason = "authorization-not-established",
): never {
  throw new Error(reason);
}
