import type {
  QueryHandler,
} from "../../../../../application/handlers/canonical/contracts/queryHandler";

export const devicesQueryHandler:
  QueryHandler = {
    queryType:
      "devices.query",

    async execute(query: unknown) {
      const q = query as { type: string; input: unknown };
      return {
        domain: "devices",
        queryType:
          q.type,
        input:
          q.input,
      };
    },
  };
