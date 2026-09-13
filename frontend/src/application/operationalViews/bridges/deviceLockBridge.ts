import {
  queryEntityGraph,
} from "../../dataFabric/runtime/queryEntityGraph";

export function resolveDeviceLockBridge() {
  return queryEntityGraph(
    "device",
    "lock",
  );
}
