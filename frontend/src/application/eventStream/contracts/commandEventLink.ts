export interface CommandEventLink {
  id: string;
  commandId: string;
  eventType: string;
  relation:
    | "emits"
    | "may-emit"
    | "caused-by";
  required: boolean;
}
