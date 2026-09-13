export type RuntimeOperation =
  | "start"
  | "stop"
  | "safe-mode"
  | "recover"
  | "refresh"
  | "reconcile"
  | "invalidate-cache"
  | "reconnect-realtime";
