import type {
  QueryHandler,
} from "../../../../../application/handlers/canonical/contracts/queryHandler";

export const paymentsQueryHandler:
  QueryHandler = {
    queryType:
      "payments.query",

    async execute(query: unknown) {
      const q = query as { type: string; input: unknown };
      return {
        domain: "payments",
        queryType:
          q.type,
        input:
          q.input,
      };
    },
  };
