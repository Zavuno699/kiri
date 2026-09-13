export interface FrontendHealthPolicy {
  minimumConsistencyScore: number;
  minimumDomainHealthScore: number;
  criticalOnSecurityFailure: boolean;
}

export const FRONTEND_HEALTH_POLICY: FrontendHealthPolicy = {
  minimumConsistencyScore: 70,
  minimumDomainHealthScore: 70,
  criticalOnSecurityFailure: true,
};
