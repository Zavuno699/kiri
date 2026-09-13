import {
  initializeRealtimeRuntime,
} from "./initializeRealtime";

import {
  connectRealtime,
  disconnectRealtime,
} from "../connection/realtimeConnectionController";

import {
  attachRealtimeEventBridge,
} from "./realtimeEventBridge";

import {
  attachRealtimeRefreshBridge,
} from "./attachRealtimeRefreshBridge";

export const realtimeServiceFacade = {
  initialize:
    initializeRealtimeRuntime,

  connect(
    endpoint: string,
  ): void {
    connectRealtime(
      endpoint,
    );

    attachRealtimeEventBridge();
    attachRealtimeRefreshBridge();
  },

  disconnect:
    disconnectRealtime,
};
