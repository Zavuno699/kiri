import type {
  QueryHandler,
} from "../../../../application/handlers/canonical/contracts/queryHandler";

export const locksQueryHandler:
  QueryHandler = {
    queryType:
      "locks.query",

    async execute(query) {
      return {
        domain: "locks",
        queryType:
          query.type,
        input:
          query.input,
      };
    },
  };
