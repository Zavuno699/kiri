import type {
  QueryHandler,
} from "../../../../application/handlers/canonical/contracts/queryHandler";

export const dashboardQueryHandler:
  QueryHandler = {
    queryType:
      "dashboard.query",

    async execute(query) {
      return {
        domain: "dashboard",
        queryType:
          query.type,
        input:
          query.input,
      };
    },
  };
