import type {
  QueryHandler,
} from "../../../../application/handlers/canonical/contracts/queryHandler";

export const devicesQueryHandler:
  QueryHandler = {
    queryType:
      "devices.query",

    async execute(query) {
      return {
        domain: "devices",
        queryType:
          query.type,
        input:
          query.input,
      };
    },
  };
