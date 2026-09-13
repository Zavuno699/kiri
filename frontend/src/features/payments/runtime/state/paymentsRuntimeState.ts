import {
  getDomainRuntime,
} from "../../../../application/domainRuntime/state/domainRuntimeStore";

export function getPaymentsRuntimeState() {
  return getDomainRuntime(
    "payments",
  );
}
