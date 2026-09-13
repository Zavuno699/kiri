import {
  listFlows,
} from "../registry/flowRegistry";

import {
  listDomainFlowDefinitions,
} from "../registry/domainFlowRegistry";

export function getFlowDiagnostics() {
  return {
    flowCount:
      listFlows().length,

    domainFlowCount:
      listDomainFlowDefinitions().length,

    flows:
      listFlows().map(
        (flow) => ({
          key:
            flow.key,
        }),
      ),

    domains:
      listDomainFlowDefinitions(),
  };
}
