export interface EntityIdentity {
  id: string
}

export interface VersionedEntity extends EntityIdentity {
  version?: number
}

export interface TimestampedEntity {
  createdAt?: string
  updatedAt?: string
}
