import type {
  PageAction,
} from "../contracts/pageAction";

export const devicesPageActions: PageAction[] = [
  {
    key:
      "devices.create",
    label:
      "Register device",
    capability:
      "devices.write",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "devices.update",
    label:
      "Update device",
    capability:
      "devices.write",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "devices.command",
    label:
      "Send command",
    capability:
      "devices.command",
    dangerous:
      true,
    enabled:
      true,
  },
];
