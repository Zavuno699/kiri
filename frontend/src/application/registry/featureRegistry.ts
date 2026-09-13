export interface FeatureDefinition {
  id: string
  enabled: boolean
  initialize?: () => Promise<void>
  shutdown?: () => Promise<void>
}

export class FeatureRegistry {
  private readonly features =
    new Map<string, FeatureDefinition>()

  register(
    feature: FeatureDefinition,
  ): void {
    this.features.set(
      feature.id,
      feature,
    )
  }

  get(
    id: string,
  ): FeatureDefinition | undefined {
    return this.features.get(id)
  }

  list(): FeatureDefinition[] {
    return Array.from(
      this.features.values(),
    )
  }

  enabled(): FeatureDefinition[] {
    return this.list().filter(
      (feature) => feature.enabled,
    )
  }
}

export const featureRegistry =
  new FeatureRegistry()
