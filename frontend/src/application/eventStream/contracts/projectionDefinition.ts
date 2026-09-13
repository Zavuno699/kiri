export interface ProjectionDefinition {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  sourceEventTypes: string[];
  enabled: boolean;
}
