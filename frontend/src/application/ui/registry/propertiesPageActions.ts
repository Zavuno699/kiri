import type {
  PageAction,
} from "../contracts/pageAction";

export const propertiesPageActions: PageAction[] = [
  {
    key:
      "properties.create",
    label:
      "Create property",
    capability:
      "properties.write",
    dangerous:
      false,
    enabled:
      true,
  },
  {
    key:
      "properties.update",
    label:
      "Update property",
    capability:
      "properties.write",
    dangerous:
      false,
    enabled:
      true,
  },
];
