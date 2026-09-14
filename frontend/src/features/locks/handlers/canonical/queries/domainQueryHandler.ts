import type {
  QueryHandler,
} from "../../../../../application/handlers/canonical/contracts/queryHandler";

export const locksQueryHandler:
  QueryHandler = {
    queryType:
      "locks.query",

    async execute(query: unknown) {
      const q = query as { type: string; input: unknown };
      return {
        domain: "locks",
        queryType:
          q.type,
        input:
          q.input,
      };
    },
  };
