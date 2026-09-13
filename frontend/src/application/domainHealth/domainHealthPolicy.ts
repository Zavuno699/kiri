export interface DomainHealthPolicy {
  minimumScore: number;
  criticalIfUnavailable: boolean;
}

export const DOMAIN_HEALTH_POLICY: DomainHealthPolicy = {
  minimumScore: 70,
  criticalIfUnavailable: true,
};
