import {
  readPaymentsFlow,
} from "./queries/readPaymentsFlow";

export const paymentsFlowFacade = {
  read:
    readPaymentsFlow,
};
