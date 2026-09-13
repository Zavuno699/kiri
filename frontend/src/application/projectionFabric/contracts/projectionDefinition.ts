export interface ProjectionDefinition {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  sourceEventTypes: string[];
  materialized: boolean;
  rebuildable: boolean;
  enabled: boolean;
}
