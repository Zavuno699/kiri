import {
  getRuntimeControlModel,
} from "../../../components/runtime/control/runtimeControlModel";

export function getLeasesRuntimeControl() {
  const model =
    getRuntimeControlModel();

  return {
    domain:
      "leases",

    runtime:
      model.state,

    subsystems:
      model.subsystems,
  };
}
