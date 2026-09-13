import {
  presentDevice,
} from "../presenters/devicePresenter"

export function integrateDevice(
  raw: Parameters<typeof presentDevice>[0],
) {
  return presentDevice(raw)
}
