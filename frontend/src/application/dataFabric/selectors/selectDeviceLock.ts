import {
  queryEntityGraph,
} from "../runtime/queryEntityGraph";

export function selectDeviceLock() {
  return queryEntityGraph(
    "device",
    "lock",
  );
}
