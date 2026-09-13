import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requirePaymentsResourceRead(): void {
  requireCapability(
    "payments.read",
  );
}
