import {
  getDomainRuntime,
} from "../../../../application/domainRuntime/state/domainRuntimeStore";

export function getLocksRuntimeState() {
  return getDomainRuntime(
    "locks",
  );
}
