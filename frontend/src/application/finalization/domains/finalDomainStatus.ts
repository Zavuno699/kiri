import { finalDomainSurface } from "./finalDomainSurface";

export function calculateDomainClosure() {
  return finalDomainSurface.map((domain) => ({
    domain: domain.domain,
    complete:
      domain.projection &&
      domain.commands &&
      domain.queries &&
      domain.realtime &&
      domain.security,
  }));
}
