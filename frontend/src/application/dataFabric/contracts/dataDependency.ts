export interface DataDependency {
  id: string;
  sourceDomain: string;
  sourceType: string;
  targetDomain: string;
  targetType: string;
  reason: string;
  required: boolean;
  directional: boolean;
}
