export interface LockService {
    list(): Promise<unknown[]>
    get(id:string): Promise<unknown>
}

