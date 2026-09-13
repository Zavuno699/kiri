import {
  initializeDataFabric,
} from "./initializeDataFabric";

let started =
  false;

export function startDataFabricOnce(): void {
  if (started) {
    return;
  }

  started =
    true;

  initializeDataFabric();
}
