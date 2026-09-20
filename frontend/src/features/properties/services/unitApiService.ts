import { apiFetch } from "../../../api/client"
import type {
  UnitRecord,
  CreateUnitRequest,
  UpdateUnitRequest,
} from "../types/unit"

export class UnitApiService {
  async getPropertyUnits(propertyId: string): Promise<UnitRecord[]> {
    return apiFetch<UnitRecord[]>(`/units/property?property_id=${propertyId}`, undefined, { useIdentityService: true })
  }

  async getAvailableUnits(propertyId: string): Promise<UnitRecord[]> {
    return apiFetch<UnitRecord[]>(`/units/available?property_id=${propertyId}`, undefined, { useIdentityService: true })
  }

  async getUnit(unitId: string): Promise<UnitRecord> {
    return apiFetch<UnitRecord>(`/units/unit?unit_id=${unitId}`, undefined, { useIdentityService: true })
  }

  async createUnit(request: CreateUnitRequest): Promise<UnitRecord> {
    return apiFetch<UnitRecord>("/units", {
      method: "POST",
      body: JSON.stringify(request),
    }, { useIdentityService: true })
  }

  async updateUnit(unitId: string, request: UpdateUnitRequest): Promise<void> {
    return apiFetch<void>(`/units/unit?unit_id=${unitId}`, {
      method: "PUT",
      body: JSON.stringify(request),
    }, { useIdentityService: true })
  }

  async updateUnitLifecycle(unitId: string, lifecycle: string): Promise<void> {
    return apiFetch<void>(`/units/lifecycle?unit_id=${unitId}&lifecycle=${lifecycle}`, {
      method: "POST",
    }, { useIdentityService: true })
  }
}
