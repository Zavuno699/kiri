export type CommandRisk =
  | "read"
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface CommandDefinition {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  risk: CommandRisk;
  requiresAuthorization: boolean;
  requiresConfirmation: boolean;
  enabled: boolean;
}
