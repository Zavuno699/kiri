export interface RuntimeAuthorizationResult {
  capability: string;
  allowed: boolean;
  reason: string;
  evaluatedAt: string;
}
