import {
  dispatchApplicationCommand,
} from "./dispatchCommand";

import {
  dispatchApplicationQuery,
} from "./dispatchQuery";

import {
  publishApplicationEvent,
} from "./publishEvent";

export const applicationBusFacade = {
  command:
    dispatchApplicationCommand,
  query:
    dispatchApplicationQuery,
  event:
    publishApplicationEvent,
};
