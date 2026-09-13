export interface FeatureRegistry {
    register(feature: string): void
    list(): string[]
}
