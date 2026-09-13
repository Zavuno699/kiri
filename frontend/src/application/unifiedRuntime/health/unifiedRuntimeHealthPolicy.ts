export interface UnifiedRuntimeHealthPolicy {
  minimumScore: number;
  minimumConsistencyScore: number;
  minimumDomainHealthScore: number;
}

export const unifiedRuntimeHealthPolicy: UnifiedRuntimeHealthPolicy = {
  minimumScore: 70,
  minimumConsistencyScore: 70,
  minimumDomainHealthScore: 70,
};
