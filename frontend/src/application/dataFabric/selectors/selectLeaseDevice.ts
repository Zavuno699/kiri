import {
  queryEntityGraph,
} from "../runtime/queryEntityGraph";

export function selectLeaseDevice() {
  return queryEntityGraph(
    "lease",
    "device",
  );
}
