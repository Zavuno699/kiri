export interface ApplicationRuntime {
    start(): Promise<void>
    stop(): Promise<void>
}
