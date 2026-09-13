import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requirePaymentsResourceWrite(): void {
  requireCapability(
    "payments.write",
  );
}
