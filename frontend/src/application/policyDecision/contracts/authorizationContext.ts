export interface AuthorizationContext {
  subjectId: string | null;
  authenticated: boolean;
  roles: string[];
  capabilities: string[];
  domains: string[];
  elevated: boolean;
}
