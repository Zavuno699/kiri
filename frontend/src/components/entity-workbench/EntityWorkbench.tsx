import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getEntityWorkbenchState,
  subscribeEntityWorkbench,
} from "../../application/operationalViews/workbench/entityWorkbenchStore";

import {
  selectOperationalEntity,
} from "../../application/operationalViews/selectors/selectOperationalEntity";

import {
  buildEntityFacets,
} from "../../application/operationalViews/workbench/buildEntityFacets";

import {
  resolveOperationalContext,
} from "../../application/operationalViews/context/resolveOperationalContext";

import {
  EntityWorkbenchHeader,
} from "./header/EntityWorkbenchHeader";

import {
  EntityFacetGrid,
} from "./facets/EntityFacetGrid";

import {
  EntityRelationshipList,
} from "./relationships/EntityRelationshipList";

import {
  EntityDependencyList,
} from "./dependencies/EntityDependencyList";

import {
  OperationalContextStrip,
} from "./context/OperationalContextStrip";

import {
  EntityWorkbenchStatus,
} from "./status/EntityWorkbenchStatus";

interface Props {
  entityId?: string | null;
}

export function EntityWorkbench({
  entityId =
    null,
}: Props) {
  const [
    state,
    setState,
  ] = useState(
    getEntityWorkbenchState(),
  );

  useEffect(
    () =>
      subscribeEntityWorkbench(
        () =>
          setState(
            getEntityWorkbenchState(),
          ),
      ),
    [],
  );

  const selectedId =
    entityId ??
    state.selectedEntityId;

  const entity =
    selectedId
      ? selectOperationalEntity(
          selectedId,
        )
      : null;

  const facets =
    useMemo(
      () =>
        buildEntityFacets(
          entity,
        ),
      [entity],
    );

  const context =
    resolveOperationalContext({
      property:
        entity?.domain ===
        "properties"
          ? entity.id
          : null,
      lease:
        entity?.domain ===
        "leases"
          ? entity.id
          : null,
      payment:
        entity?.domain ===
        "payments"
          ? entity.id
          : null,
      device:
        entity?.domain ===
        "devices"
          ? entity.id
          : null,
      lock:
        entity?.domain ===
        "locks"
          ? entity.id
          : null,
      security:
        entity?.domain ===
        "security"
          ? entity.id
          : null,
    });

  return (
    <div className="space-y-4">
      <EntityWorkbenchHeader />

      <EntityFacetGrid
        facets={facets}
      />

      <OperationalContextStrip
        context={context}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <EntityRelationshipList
          entityId={
            selectedId
          }
        />

        <EntityDependencyList
          domain={
            entity?.domain ??
            null
          }
        />
      </div>

      <EntityWorkbenchStatus />
    </div>
  );
}
