export interface StateDependency {
  sourceSlice: string;
  targetSlice: string;
  reason: string;
  required: boolean;
}
