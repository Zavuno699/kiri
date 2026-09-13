import {
  listDomainFlowDefinitions,
} from "../registry/domainFlowRegistry";

export function getFlowCoverageSnapshot() {
  const definitions =
    listDomainFlowDefinitions();

  return {
    domainCount:
      definitions.length,

    commandEnabled:
      definitions.filter(
        (item) =>
          item.steps.includes(
            "command",
          ),
      ).length,

    queryEnabled:
      definitions.filter(
        (item) =>
          item.steps.includes(
            "query",
          ),
      ).length,

    eventEnabled:
      definitions.filter(
        (item) =>
          item.steps.includes(
            "event",
          ),
      ).length,

    apiEnabled:
      definitions.filter(
        (item) =>
          item.steps.includes(
            "api",
          ),
      ).length,

    projectionEnabled:
      definitions.filter(
        (item) =>
          item.steps.includes(
            "projection",
          ),
      ).length,

    persistenceEnabled:
      definitions.filter(
        (item) =>
          item.steps.includes(
            "persistence",
          ),
      ).length,
  };
}
