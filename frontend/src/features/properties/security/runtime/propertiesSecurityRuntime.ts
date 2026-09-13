import {
  requirePropertiesRead,
} from "../guards/requirePropertiesRead";

import {
  requirePropertiesWrite,
} from "../guards/requirePropertiesWrite";

export const propertiesSecurityRuntime = {
  requireRead:
    requirePropertiesRead,

  requireWrite:
    requirePropertiesWrite,
};
