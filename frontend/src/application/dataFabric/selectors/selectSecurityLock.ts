import {
  queryEntityGraph,
} from "../runtime/queryEntityGraph";

export function selectSecurityLock() {
  return queryEntityGraph(
    "security",
    "lock",
  );
}
