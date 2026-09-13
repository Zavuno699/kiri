export interface SecurityCapability {
  key: string;
  description: string;
  dangerous: boolean;
  requiresPrincipal: boolean;
  requiresActiveSession: boolean;
}
