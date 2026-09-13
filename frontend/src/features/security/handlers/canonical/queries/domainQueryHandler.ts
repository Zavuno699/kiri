import type {
  QueryHandler,
} from "../../../../application/handlers/canonical/contracts/queryHandler";

export const securityQueryHandler:
  QueryHandler = {
    queryType:
      "security.query",

    async execute(query) {
      return {
        domain: "security",
        queryType:
          query.type,
        input:
          query.input,
      };
    },
  };
