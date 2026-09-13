export interface SecurityApplication {
  summary(): Promise<unknown>
  credentials(): Promise<unknown[]>
  access(): Promise<unknown[]>
  events(): Promise<unknown[]>
}
