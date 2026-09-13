export interface DeviceDataflowController {
  start(): void
  stop(): void
}

export function createDeviceDataflowController():
  DeviceDataflowController {

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
