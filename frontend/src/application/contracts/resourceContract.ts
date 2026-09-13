export interface ResourceContract {
  name: string
  listSupported: boolean
  detailSupported: boolean
  mutationSupported: boolean
  verified: boolean
  notes?: string
}
