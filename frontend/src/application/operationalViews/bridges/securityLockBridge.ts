import {
  queryEntityGraph,
} from "../../dataFabric/runtime/queryEntityGraph";

export function resolveSecurityLockBridge() {
  return queryEntityGraph(
    "security",
    "lock",
  );
}
