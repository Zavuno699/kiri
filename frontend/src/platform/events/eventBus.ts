export interface EventBus {
    publish(event:string,payload:unknown):void
}
