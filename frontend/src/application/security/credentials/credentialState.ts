
import type { CredentialMetadata } from "./credentialMetadata";

export interface CredentialState {
  credentials: CredentialMetadata[];
  loading: boolean;
  error: string | null;
}

