import {
  buildCanonicalDataGraph,
} from "../graph/buildCanonicalGraph";

export function synchronizeDataFabric(): void {
  buildCanonicalDataGraph();
}
