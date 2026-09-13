
import { registerPolicy } from "../policy/policyRegistry";

export function registerSecurityPolicies(): void {
  registerPolicy("default-deny", () => ({
    allowed: false,
    effect: "deny",
    reason: "default-deny",
    policy: "default-deny",
  }));
}

