import { apiFetch } from "../../../api/client"
import type {
  PropertyRecord,
  CreatePropertyRequest,
  UpdatePropertyRequest,
} from "../types/property"

export class PropertyApiService {
  async getProperties(): Promise<PropertyRecord[]> {
    return apiFetch<PropertyRecord[]>("/properties", undefined, { useIdentityService: true })
  }

  async getProperty(propertyId: string): Promise<PropertyRecord> {
    return apiFetch<PropertyRecord>(`/properties/property?property_id=${propertyId}`, undefined, { useIdentityService: true })
  }

  async createProperty(request: CreatePropertyRequest): Promise<PropertyRecord> {
    return apiFetch<PropertyRecord>("/properties", {
      method: "POST",
      body: JSON.stringify(request),
    }, { useIdentityService: true })
  }

  async updateProperty(propertyId: string, request: UpdatePropertyRequest): Promise<void> {
    return apiFetch<void>(`/properties/property?property_id=${propertyId}`, {
      method: "PUT",
      body: JSON.stringify(request),
    }, { useIdentityService: true })
  }

  async activateProperty(propertyId: string): Promise<void> {
    return apiFetch<void>(`/properties/activate?property_id=${propertyId}`, {
      method: "POST",
    }, { useIdentityService: true })
  }
}
