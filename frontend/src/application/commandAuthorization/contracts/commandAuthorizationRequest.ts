export interface CommandAuthorizationRequest {
  command: string;
  capability: string;
  domain: string;
  resourceId?: string | null;
  dangerous: boolean;
  mutating: boolean;
}
