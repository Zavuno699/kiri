import type {
  EntityState,
} from "../contracts/entityState";

const states = new Map<
  string,
  EntityState
>();

function makeKey(
  domain: string,
  entityId: string,
): string {
  return `${domain}:${entityId}`;
}

export function initializeEntityState(
  domain: string,
  entityId: string,
  state: string,
  metadata:
    Record<string, unknown> = {},
): EntityState {
  const existing =
    states.get(
      makeKey(
        domain,
        entityId,
      ),
    );

  if (existing) {
    return existing;
  }

  const next: EntityState = {
    entityId,
    domain,
    state,
    version:
      1,
    updatedAt:
      new Date().toISOString(),
    metadata,
  };

  states.set(
    makeKey(
      domain,
      entityId,
    ),
    next,
  );

  return next;
}

export function getEntityState(
  domain: string,
  entityId: string,
): EntityState | null {
  return (
    states.get(
      makeKey(
        domain,
        entityId,
      ),
    ) ??
    null
  );
}

export function updateEntityState(
  domain: string,
  entityId: string,
  state: string,
  metadata?: Record<
    string,
    unknown
  >,
): EntityState {
  const current =
    initializeEntityState(
      domain,
      entityId,
      state,
      metadata,
    );

  const next: EntityState = {
    ...current,
    state,
    version:
      current.version +
      1,
    updatedAt:
      new Date().toISOString(),
    metadata:
      metadata ??
      current.metadata,
  };

  states.set(
    makeKey(
      domain,
      entityId,
    ),
    next,
  );

  return next;
}

export function listEntityStates(): EntityState[] {
  return [
    ...states.values(),
  ];
}
