
import type { PolicyAction } from "./policyAction";
import type { PolicyResource } from "./policyResource";
import type { PolicySubject } from "./policySubject";

export interface PolicyContext {
  subject: PolicySubject;
  resource: PolicyResource | null;
  action: PolicyAction;
}

