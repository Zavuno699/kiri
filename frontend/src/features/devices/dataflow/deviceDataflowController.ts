export interface DeviceDataflowController {
  start(): void
  stop(): void
}

export function createDeviceDataflowController():
  DeviceDataflowController {
  let running = false

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
