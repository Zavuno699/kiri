import {
  getDomainRuntime,
} from "../../../../application/domainRuntime/state/domainRuntimeStore";

export function getDashboardRuntimeState() {
  return getDomainRuntime(
    "dashboard",
  );
}
