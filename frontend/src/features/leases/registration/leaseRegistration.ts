export interface LeaseRegistration {
  id: "leases"
  registered: boolean
  readOnly: boolean
}

export const leaseRegistration: LeaseRegistration = {
  id: "leases",
  registered: true,
  readOnly: true,
}
