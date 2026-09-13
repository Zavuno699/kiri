import {
  getDomainRuntime,
} from "../../../../application/domainRuntime/state/domainRuntimeStore";

export function getSecurityRuntimeState() {
  return getDomainRuntime(
    "security",
  );
}
