export interface LeaseService {
    list(): Promise<unknown[]>
    get(id:string): Promise<unknown>
}

