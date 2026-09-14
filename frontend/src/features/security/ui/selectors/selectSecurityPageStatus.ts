import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function selectSecurityPageStatus() {
  const runtime = getPageRuntime("security");
  if (!runtime) return "idle";
  if (runtime.loading) return "loading";
  if (runtime.error) return "error";
  if (runtime.ready) return "ready";
  return "idle";
}
