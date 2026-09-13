export interface DependencyGraph {
    resolve<T>(token: string): T
}
