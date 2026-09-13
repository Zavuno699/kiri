import {
  getEntityWorkbenchState,
} from "../workbench/entityWorkbenchStore";

export function getWorkbenchDiagnostics() {
  const state =
    getEntityWorkbenchState();

  return {
    selectedEntityId:
      state.selectedEntityId,
    selectedDomain:
      state.selectedDomain,
    selectedType:
      state.selectedType,
    relatedCount:
      state.relatedEntityIds.length,
    relationshipCount:
      state.relationshipIds.length,
    dependencyCount:
      state.dependencyIds.length,
    loading:
      state.loading,
    error:
      state.error,
  };
}
