import {
  getPropertiesPageState,
} from "../state/propertiesPageState";

import {
  getPropertiesPageActions,
} from "../actions/getPropertiesPageActions";

export function createPropertiesViewModel() {
  const state =
    getPropertiesPageState();

  return {
    domain:
      "properties",

    title:
      "Properties",

    data:
      state.data?.data ??
      null,

    status:
      state.runtime?.ready
        ? "ready"
        : state.runtime?.loading
          ? "loading"
          : state.runtime?.error
            ? "error"
            : "idle",

    error:
      state.runtime?.error ??
      null,

    actions:
      getPropertiesPageActions(),
  };
}
