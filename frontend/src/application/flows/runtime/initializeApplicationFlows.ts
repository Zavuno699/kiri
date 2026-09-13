import {
  registerCanonicalDomainFlows,
} from "../registry/registerDomainFlows";

export function initializeApplicationFlows(): void {
  registerCanonicalDomainFlows();
}
