import {
  listEntities,
} from "../entities/entityStore";

import {
  listEntityTypes,
} from "../registry/entityRegistry";

import {
  listRelationships,
} from "../relationships/relationshipStore";

import {
  listDataDependencies,
} from "../dependencies/dependencyStore";

import {
  listGraphNodes,
  listGraphEdges,
} from "../graph/dataGraphStore";

export function getDataFabricDiagnostics() {
  return {
    entityCount:
      listEntities().length,

    entityTypeCount:
      listEntityTypes().length,

    relationshipCount:
      listRelationships().length,

    dependencyCount:
      listDataDependencies().length,

    graphNodeCount:
      listGraphNodes().length,

    graphEdgeCount:
      listGraphEdges().length,
  };
}
