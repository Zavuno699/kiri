import {
  getDataFabricDiagnostics,
} from "./dataFabricDiagnostics";

export function getDataFabricCoverage() {
  const diagnostics =
    getDataFabricDiagnostics();

  return {
    entityTypes:
      diagnostics.entityTypeCount,

    relationships:
      diagnostics.relationshipCount,

    dependencies:
      diagnostics.dependencyCount,

    graphNodes:
      diagnostics.graphNodeCount,

    graphEdges:
      diagnostics.graphEdgeCount,

    connected:
      diagnostics.entityTypeCount >= 6 &&
      diagnostics.relationshipCount >= 6 &&
      diagnostics.dependencyCount >= 6 &&
      diagnostics.graphNodeCount >= 6,
  };
}
