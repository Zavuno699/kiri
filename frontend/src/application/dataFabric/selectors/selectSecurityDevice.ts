import {
  queryEntityGraph,
} from "../runtime/queryEntityGraph";

export function selectSecurityDevice() {
  return queryEntityGraph(
    "security",
    "device",
  );
}
