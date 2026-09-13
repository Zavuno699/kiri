import {
  requireCapability,
} from "../requireCapability";

export function guardSecurityRoute(): void {
  requireCapability(
    "security.read",
  );
}
