import {
  getDomainRuntime,
} from "../../../../application/domainRuntime/state/domainRuntimeStore";

export function getPropertiesRuntimeState() {
  return getDomainRuntime(
    "properties",
  );
}
