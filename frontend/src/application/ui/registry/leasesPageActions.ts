import type {
  PageAction,
} from "../contracts/pageAction";

export const leasesPageActions: PageAction[] = [
  {
    key:
      "leases.create",
    label:
      "Create lease",
    capability:
      "leases.write",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "leases.update",
    label:
      "Update lease",
    capability:
      "leases.write",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "leases.terminate",
    label:
      "Terminate lease",
    capability:
      "leases.write",
    dangerous:
      true,
    enabled:
      true,
  },
];
