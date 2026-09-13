export interface DomainDependency {
  source: string;
  target: string;
  required: boolean;
  reason: string;
}
