import type {
  QueryHandler,
} from "../../../../../application/handlers/canonical/contracts/queryHandler";

export const leasesQueryHandler:
  QueryHandler = {
    queryType:
      "leases.query",

    async execute(query: unknown) {
      const q = query as { type: string; input: unknown };
      return {
        domain: "leases",
        queryType:
          q.type,
        input:
          q.input,
      };
    },
  };
