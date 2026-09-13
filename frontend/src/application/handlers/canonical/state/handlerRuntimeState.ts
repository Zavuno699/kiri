export interface HandlerRuntimeState {
  initialized: boolean;
  commandHandlers: number;
  queryHandlers: number;
  eventHandlers: number;
  missingCommands: string[];
  missingQueries: string[];
}
