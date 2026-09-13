import {
  getDomainRuntime,
} from "../../../../application/domainRuntime/state/domainRuntimeStore";

export function getDevicesRuntimeState() {
  return getDomainRuntime(
    "devices",
  );
}
