export interface ApplicationLifecycle {
    start(): Promise<void>
    stop(): Promise<void>
}
