import {
  requireCapability,
} from "../../../../security/guards/requireCapability";

export function guardLeasePaymentAuthorization(): void {
  requireCapability(
    "payments.write",
  );
}
