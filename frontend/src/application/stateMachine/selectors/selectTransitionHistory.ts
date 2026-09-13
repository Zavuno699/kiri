import {
  listTransitionHistory,
  listTransitionHistoryForEntity,
  listTransitionHistoryForDomain,
} from "../history/transitionHistoryStore";

export function selectTransitionHistory(
  options: {
    entityId?: string;
    domain?: string;
  } = {},
) {
  if (
    options.entityId
  ) {
    return listTransitionHistoryForEntity(
      options.entityId,
    );
  }

  if (
    options.domain
  ) {
    return listTransitionHistoryForDomain(
      options.domain,
    );
  }

  return listTransitionHistory();
}
