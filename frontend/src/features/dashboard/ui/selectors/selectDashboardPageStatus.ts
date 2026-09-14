import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function selectDashboardPageStatus() {
  const runtime = getPageRuntime("dashboard");
  if (!runtime) return "idle";
  if (runtime.loading) return "loading";
  if (runtime.error) return "error";
  if (runtime.ready) return "ready";
  return "idle";
}
