import type {
  QueryHandler,
} from "../../../../../application/handlers/canonical/contracts/queryHandler";

export const dashboardQueryHandler:
  QueryHandler = {
    queryType:
      "dashboard.query",

    async execute(query: unknown) {
      const q = query as { type: string; input: unknown };
      return {
        domain: "dashboard",
        queryType:
          q.type,
        input:
          q.input,
      };
    },
  };
