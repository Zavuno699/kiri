export interface SecuritySession {
  id: string;
  principalId: string | null;
  active: boolean;
  createdAt: string | null;
  expiresAt: string | null;
  lastActivityAt: string | null;
}
