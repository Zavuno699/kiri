export interface LeaseRuntime {
  domain: "leases"
  started: boolean
  readOnly: boolean
}

export const leaseRuntime: LeaseRuntime = {
  domain: "leases",
  started: false,
  readOnly: true,
}
