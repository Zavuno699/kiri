import {
  queryEntityGraph,
} from "../runtime/queryEntityGraph";

export function selectPropertyLease() {
  return queryEntityGraph(
    "property",
    "lease",
  );
}
