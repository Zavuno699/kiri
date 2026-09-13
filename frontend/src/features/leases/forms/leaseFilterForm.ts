export interface LeaseFilterForm {
  search: string
  status: string
}

export const emptyLeaseFilterForm: LeaseFilterForm = {
  search: "",
  status: "",
}
