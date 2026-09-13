export interface BusRuntimeState {
  initialized: boolean;
  commandHandlers: number;
  queryHandlers: number;
  eventHandlers: number;
  commandReady: boolean;
  queryReady: boolean;
  eventReady: boolean;
  reasons: string[];
}
