
export interface AuthorizeCapabilityCommand {
  type: "security.authorization.evaluate";
  capability: string;
  resourceType?: string;
  resourceId?: string | null;
}

