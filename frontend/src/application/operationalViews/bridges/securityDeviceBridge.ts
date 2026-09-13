import {
  queryEntityGraph,
} from "../../dataFabric/runtime/queryEntityGraph";

export function resolveSecurityDeviceBridge() {
  return queryEntityGraph(
    "security",
    "device",
  );
}
