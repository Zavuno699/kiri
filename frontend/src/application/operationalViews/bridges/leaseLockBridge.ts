import {
  queryEntityGraph,
} from "../../dataFabric/runtime/queryEntityGraph";

export function resolveLeaseLockBridge() {
  return queryEntityGraph(
    "lease",
    "lock",
  );
}
