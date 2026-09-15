export interface RBACPolicyDefinition {
  key: string
  capabilities: string[]
}

export const defaultRBACPolicy:
  RBACPolicyDefinition = {
    key: "default",
    capabilities: [],
  }
