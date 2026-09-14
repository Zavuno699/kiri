import type {
  QueryHandler,
} from "../../../../../application/handlers/canonical/contracts/queryHandler";

export const securityQueryHandler:
  QueryHandler = {
    queryType:
      "security.query",

    async execute(query: unknown) {
      return {
        domain: "security",
        queryType:
          (query as { type: string }).type,
        input:
          (query as { input: unknown }).input,
      };
    },
  };
