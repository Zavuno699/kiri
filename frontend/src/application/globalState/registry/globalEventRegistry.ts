import type {
  GlobalStateEvent,
} from "../contracts/stateEvent";

type Handler =
  (
    event: GlobalStateEvent,
  ) => void | Promise<void>;

const handlers = new Map<
  string,
  Handler[]
>();

export function registerGlobalEventHandler(
  eventType: string,
  handler: Handler,
): void {
  const current =
    handlers.get(
      eventType,
    ) ?? [];

  current.push(
    handler,
  );

  handlers.set(
    eventType,
    current,
  );
}

export function getGlobalEventHandlers(
  eventType: string,
): Handler[] {
  return [
    ...(handlers.get(
      eventType,
    ) ?? []),
  ];
}

export function listRegisteredGlobalEventTypes(): string[] {
  return [
    ...handlers.keys(),
  ];
}
