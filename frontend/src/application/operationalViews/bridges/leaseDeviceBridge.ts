import {
  queryEntityGraph,
} from "../../dataFabric/runtime/queryEntityGraph";

export function resolveLeaseDeviceBridge() {
  return queryEntityGraph(
    "lease",
    "device",
  );
}
