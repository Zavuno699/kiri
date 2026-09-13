import type {
  QueryHandler,
} from "../../../../application/handlers/canonical/contracts/queryHandler";

export const leasesQueryHandler:
  QueryHandler = {
    queryType:
      "leases.query",

    async execute(query) {
      return {
        domain: "leases",
        queryType:
          query.type,
        input:
          query.input,
      };
    },
  };
