import {
  queryEntityGraph,
} from "../runtime/queryEntityGraph";

export function selectLeaseLock() {
  return queryEntityGraph(
    "lease",
    "lock",
  );
}
