export interface EntityWorkbenchState {
  selectedEntityId: string | null;
  selectedDomain: string | null;
  selectedType: string | null;
  relatedEntityIds: string[];
  relationshipIds: string[];
  dependencyIds: string[];
  loading: boolean;
  error: string | null;
}
