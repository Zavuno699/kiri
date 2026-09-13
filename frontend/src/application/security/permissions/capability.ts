
export interface Capability {
  key: string;
  description: string;
  sensitive: boolean;
  requiresAuthenticatedSession: boolean;
  dangerous: boolean;
}

