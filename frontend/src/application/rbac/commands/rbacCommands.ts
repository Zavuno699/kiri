export interface InitializeRBACCommand {
  type: "rbac.initialize";
  roles: string[];
}

export interface EvaluateCapabilityCommand {
  type: "rbac.evaluateCapability";
  capability: string;
}

export interface RefreshRBACCommand {
  type: "rbac.refresh";
}
