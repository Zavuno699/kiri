import {
  presentLock,
} from "../presenters/lockPresenter"

export function integrateLock(
  raw: Parameters<typeof presentLock>[0],
) {
  return presentLock(raw)
}
