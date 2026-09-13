export interface OperationalDependencyView {
  id: string;
  sourceDomain: string;
  targetDomain: string;
  sourceType: string;
  targetType: string;
  reason: string;
  required: boolean;
}
