export interface SecurityService {
    list(): Promise<unknown[]>
    get(id:string): Promise<unknown>
}

