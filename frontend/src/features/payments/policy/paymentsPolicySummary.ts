import {
  getPaymentsPolicyContext,
} from "../../../application/policyDecision/adapters/paymentsPolicyAdapter";

export function getPaymentsPolicySummary() {
  return getPaymentsPolicyContext();
}
