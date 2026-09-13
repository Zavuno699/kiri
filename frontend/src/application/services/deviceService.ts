export interface DeviceService {
    list(): Promise<unknown[]>
    get(id:string): Promise<unknown>
}

