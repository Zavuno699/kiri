import type {
  TransitionHistoryEntry,
} from "../contracts/transitionHistoryEntry";

const history: TransitionHistoryEntry[] =
  [];

export function appendTransitionHistory(
  entry: TransitionHistoryEntry,
): void {
  history.unshift(
    entry,
  );
}

export function listTransitionHistory(): TransitionHistoryEntry[] {
  return [
    ...history,
  ];
}

export function listTransitionHistoryForEntity(
  entityId: string,
): TransitionHistoryEntry[] {
  return history.filter(
    (entry) =>
      entry.entityId ===
      entityId,
  );
}

export function listTransitionHistoryForDomain(
  domain: string,
): TransitionHistoryEntry[] {
  return history.filter(
    (entry) =>
      entry.domain ===
      domain,
  );
}
