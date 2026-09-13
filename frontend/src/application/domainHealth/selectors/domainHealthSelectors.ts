import type { DomainHealthState } from "../state/domainHealthState";

export const selectDomainHealthList = (
  state: DomainHealthState,
) => state.domains;

export const selectDomainHealthScore = (
  state: DomainHealthState,
) => state.score;

export const selectUnhealthyDomains = (
  state: DomainHealthState,
) =>
  state.domains.filter(
    (domain) =>
      domain.status !== "healthy",
  );
