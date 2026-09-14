import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function selectLeasesPageStatus() {
  const runtime = getPageRuntime("leases");
  if (!runtime) return "idle";
  if (runtime.loading) return "loading";
  if (runtime.error) return "error";
  if (runtime.ready) return "ready";
  return "idle";
}
