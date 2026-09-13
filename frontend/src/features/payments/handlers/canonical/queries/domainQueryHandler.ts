import type {
  QueryHandler,
} from "../../../../application/handlers/canonical/contracts/queryHandler";

export const paymentsQueryHandler:
  QueryHandler = {
    queryType:
      "payments.query",

    async execute(query) {
      return {
        domain: "payments",
        queryType:
          query.type,
        input:
          query.input,
      };
    },
  };
