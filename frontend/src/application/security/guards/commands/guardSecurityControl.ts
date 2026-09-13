import {
  requireCapability,
} from "../requireCapability";

export function guardSecurityControl(): void {
  requireCapability(
    "security.control",
  );
}
