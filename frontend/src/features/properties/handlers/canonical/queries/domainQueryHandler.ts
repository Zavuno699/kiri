import type {
  QueryHandler,
} from "../../../../../application/handlers/canonical/contracts/queryHandler";

export const propertiesQueryHandler:
  QueryHandler = {
    queryType:
      "properties.query",

    async execute(query: unknown) {
      const q = query as { type: string; input: unknown };
      return {
        domain: "properties",
        queryType:
          q.type,
        input:
          q.input,
      };
    },
  };
