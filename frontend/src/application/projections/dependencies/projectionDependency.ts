export interface ProjectionDependency {
  key: string
  version?: number
  optional?: boolean
  sourceDomain?: string
  sourceProjection?: string
  targetDomain?: string
  targetProjection?: string
  relation?: string
  priority?: number
  required?: boolean
}
