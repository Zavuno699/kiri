export interface EventDefinition {
  id: string;
  domain: string;
  name: string;
  version: number;
  label: string;
  description: string;
  category:
    | "domain"
    | "command"
    | "integration"
    | "security"
    | "system";
  enabled: boolean;
}
