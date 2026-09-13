export interface EvaluateRuntimeAuthorizationCommand {
  type: "security.runtime.authorization.evaluate";
  capability: string;
  resourceType?: string;
  resourceId?: string | null;
}
