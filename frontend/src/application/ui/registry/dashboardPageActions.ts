import type {
  PageAction,
} from "../contracts/pageAction";

export const dashboardPageActions: PageAction[] = [
  {
    key:
      "dashboard.refresh",
    label:
      "Refresh",
    capability:
      "dashboard.read",
    dangerous:
      false,
    enabled:
      true,
  },
];
