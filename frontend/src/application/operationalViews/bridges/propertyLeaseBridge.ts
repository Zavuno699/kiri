import {
  queryEntityGraph,
} from "../../dataFabric/runtime/queryEntityGraph";

export function resolvePropertyLeaseBridge() {
  return queryEntityGraph(
    "property",
    "lease",
  );
}
