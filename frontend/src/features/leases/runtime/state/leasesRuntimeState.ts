import {
  getDomainRuntime,
} from "../../../../application/domainRuntime/state/domainRuntimeStore";

export function getLeasesRuntimeState() {
  return getDomainRuntime(
    "leases",
  );
}
