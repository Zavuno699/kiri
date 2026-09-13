import type {
  QueryHandler,
} from "../../../../application/handlers/canonical/contracts/queryHandler";

export const propertiesQueryHandler:
  QueryHandler = {
    queryType:
      "properties.query",

    async execute(query) {
      return {
        domain: "properties",
        queryType:
          query.type,
        input:
          query.input,
      };
    },
  };
