import {
  initializeCanonicalApi,
} from "../runtime/initializeCanonicalApi";

import {
  getApiResource,
} from "../resources/resourceRegistry";

export const canonicalApiProvider = {
  initialize:
    initializeCanonicalApi,

  resource:
    getApiResource,
};
