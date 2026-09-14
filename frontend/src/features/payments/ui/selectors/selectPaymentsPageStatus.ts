import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function selectPaymentsPageStatus() {
  const runtime = getPageRuntime("payments");
  if (!runtime) return "idle";
  if (runtime.loading) return "loading";
  if (runtime.error) return "error";
  if (runtime.ready) return "ready";
  return "idle";
}
