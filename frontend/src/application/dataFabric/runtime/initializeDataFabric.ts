import {
  registerCanonicalEntityTypes,
} from "../registry/registerCanonicalEntityTypes";

import {
  registerCanonicalRelationships,
} from "../relationships/registerCanonicalRelationships";

import {
  registerCanonicalDependencies,
} from "../dependencies/registerCanonicalDependencies";

import {
  buildCanonicalDataGraph,
} from "../graph/buildCanonicalGraph";

export function initializeDataFabric(): void {
  registerCanonicalEntityTypes();
  registerCanonicalRelationships();
  registerCanonicalDependencies();
  buildCanonicalDataGraph();
}
