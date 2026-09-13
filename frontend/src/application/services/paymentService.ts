export interface PaymentService {
    list(): Promise<unknown[]>
    get(id:string): Promise<unknown>
}

