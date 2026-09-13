import {
  setEntityWorkbenchState,
} from "./entityWorkbenchStore";

import {
  selectEntityRelationships,
} from "../selectors/selectEntityRelationships";

import {
  selectEntityDependencies,
} from "../selectors/selectEntityDependencies";

import {
  selectRelatedEntities,
} from "../selectors/selectRelatedEntities";

import {
  selectOperationalEntity,
} from "../selectors/selectOperationalEntity";

export function hydrateEntityWorkbench(
  entityId: string,
): void {
  setEntityWorkbenchState({
    loading:
      true,
    error:
      null,
  });

  const entity =
    selectOperationalEntity(
      entityId,
    );

  if (!entity) {
    setEntityWorkbenchState({
      loading:
        false,
      error:
        "Entity not found",
      selectedEntityId:
        entityId,
      relatedEntityIds:
        [],
      relationshipIds:
        [],
      dependencyIds:
        [],
    });

    return;
  }

  const relationships =
    selectEntityRelationships(
      entityId,
    );

  const related =
    selectRelatedEntities(
      entityId,
    );

  const dependencies =
    selectEntityDependencies(
      entity.domain,
    );

  setEntityWorkbenchState({
    selectedEntityId:
      entity.id,
    selectedDomain:
      entity.domain,
    selectedType:
      entity.type,
    relatedEntityIds:
      related
        .map(
          (item) =>
            item?.id ??
            "",
        )
        .filter(Boolean),
    relationshipIds:
      relationships.map(
        (item) =>
          item.id,
      ),
    dependencyIds:
      dependencies.map(
        (item) =>
          item.id,
      ),
    loading:
      false,
    error:
      null,
  });
}
