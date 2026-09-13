import {
  requireCapability,
} from "../../../application/security/guards/requireCapability";

export function requirePaymentsWrite(): void {
  requireCapability(
    "payments.write",
  );
}
