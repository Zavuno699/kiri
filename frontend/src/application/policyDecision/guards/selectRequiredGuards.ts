import {
  listGuards,
} from "./guardRegistry";

export function selectRequiredGuards(
  domain: string,
  action: string,
) {
  const guards =
    listGuards();

  if (
    domain ===
    "security"
  ) {
    return guards.filter(
      (guard) =>
        guard.domain ===
        "security",
    );
  }

  if (
    domain ===
    "locks"
  ) {
    return guards.filter(
      (guard) =>
        guard.domain ===
          "locks" ||
        guard.domain ===
          "security",
    );
  }

  if (
    domain ===
    "devices"
  ) {
    return guards.filter(
      (guard) =>
        guard.domain ===
          "devices" ||
        guard.domain ===
          "security",
    );
  }

  if (
    domain ===
    "payments"
  ) {
    return guards.filter(
      (guard) =>
        guard.domain ===
        "payments",
    );
  }

  if (
    domain ===
    "leases"
  ) {
    return guards.filter(
      (guard) =>
        guard.domain ===
        "leases",
    );
  }

  void action;

  return [];
}
