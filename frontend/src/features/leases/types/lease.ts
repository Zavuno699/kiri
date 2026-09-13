export type LeaseStatus =
  | "active"
  | "grace_period"
  | "locked"
  | "unknown"

export interface LeaseRecord {
  id: string
  tenantId: string
  propertyId: string
  propertyName: string
  status: LeaseStatus
  entitlementFrom: string
  entitlementUntil: string
  graceUntil: string
  complianceUntil: string
  startDate: string
  endDate: string
  version: number
  updatedAt: string
}

export interface LeaseTimelineItem {
  label: string
  date: string
  state: "complete" | "current" | "upcoming"
}
