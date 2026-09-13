export type FinalRuntimeContract = {
  initialized: boolean;
  routerReady: boolean;
  securityReady: boolean;
  apiReady: boolean;
  projectionReady: boolean;
  realtimeReady: boolean;
};

export const defaultFinalRuntimeContract: FinalRuntimeContract = {
  initialized: false,
  routerReady: false,
  securityReady: false,
  apiReady: false,
  projectionReady: false,
  realtimeReady: false,
};
