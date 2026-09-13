export type BusKind =
  | "command"
  | "query"
  | "event";

export interface BusRegistration {
  key: string;
  kind: BusKind;
  initialized: boolean;
  handlerCount: number;
  required: boolean;
}
