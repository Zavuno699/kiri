import {
  getDevicesPolicyContext,
} from "../../../application/policyDecision/adapters/devicesPolicyAdapter";

export function getDevicesPolicySummary() {
  return getDevicesPolicyContext();
}
