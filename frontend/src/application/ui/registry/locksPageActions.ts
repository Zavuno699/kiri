import type {
  PageAction,
} from "../contracts/pageAction";

export const locksPageActions: PageAction[] = [
  {
    key:
      "locks.create",
    label:
      "Create lock",
    capability:
      "locks.write",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "locks.update",
    label:
      "Update lock",
    capability:
      "locks.write",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "locks.command",
    label:
      "Send lock command",
    capability:
      "locks.command",
    dangerous:
      true,
    enabled:
      true,
  },
];
