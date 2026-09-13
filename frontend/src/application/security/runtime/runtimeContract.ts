export interface SecurityRuntimeContract {
  initialized: boolean;
  authenticated: boolean;
  sessionActive: boolean;
  authorizationReady: boolean;
  policyReady: boolean;
  frozen: boolean;
}
