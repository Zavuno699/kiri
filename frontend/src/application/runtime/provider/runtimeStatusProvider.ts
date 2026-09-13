import {
  getUnifiedRuntimeSnapshot,
} from "../diagnostics/unifiedRuntimeSnapshot";

export function getRuntimeStatus() {
  return getUnifiedRuntimeSnapshot();
}
