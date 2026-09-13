import type {
  EntityWorkbenchState,
} from "../contracts/entityWorkbenchState";

let state: EntityWorkbenchState = {
  selectedEntityId:
    null,
  selectedDomain:
    null,
  selectedType:
    null,
  relatedEntityIds:
    [],
  relationshipIds:
    [],
  dependencyIds:
    [],
  loading:
    false,
  error:
    null,
};

const listeners = new Set<
  () => void
>();

export function getEntityWorkbenchState(): EntityWorkbenchState {
  return {
    ...state,
    relatedEntityIds: [
      ...state.relatedEntityIds,
    ],
    relationshipIds: [
      ...state.relationshipIds,
    ],
    dependencyIds: [
      ...state.dependencyIds,
    ],
  };
}

export function setEntityWorkbenchState(
  patch: Partial<EntityWorkbenchState>,
): void {
  state = {
    ...state,
    ...patch,
  };

  for (
    const listener of
      listeners
  ) {
    listener();
  }
}

export function subscribeEntityWorkbench(
  listener: () => void,
): () => void {
  listeners.add(
    listener,
  );

  return () => {
    listeners.delete(
      listener,
    );
  };
}

export function resetEntityWorkbench(): void {
  setEntityWorkbenchState({
    selectedEntityId:
      null,
    selectedDomain:
      null,
    selectedType:
      null,
    relatedEntityIds:
      [],
    relationshipIds:
      [],
    dependencyIds:
      [],
    loading:
      false,
    error:
      null,
  });
}
