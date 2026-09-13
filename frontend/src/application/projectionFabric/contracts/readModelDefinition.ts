export interface ReadModelDefinition {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  projectionIds: string[];
  entityType: string;
  version: number;
  enabled: boolean;
}
