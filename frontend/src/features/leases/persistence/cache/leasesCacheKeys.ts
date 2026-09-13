export const LeasesCacheKeys = {
  collection:
    "leases:leases",

  detail(
    id: string,
  ): string {
    return "leases:" + id;
  },
};
