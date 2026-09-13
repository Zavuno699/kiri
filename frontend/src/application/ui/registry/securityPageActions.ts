import type {
  PageAction,
} from "../contracts/pageAction";

export const securityPageActions: PageAction[] = [
  {
    key:
      "security.audit",
    label:
      "View audit",
    capability:
      "security.audit.read",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "security.control",
    label:
      "Security control",
    capability:
      "security.control",
    dangerous:
      true,
    enabled:
      true,
  },
  {
    key:
      "security.recovery",
    label:
      "Recovery",
    capability:
      "recovery.execute",
    dangerous:
      true,
    enabled:
      true,
  },
];
