export interface GetRolesQuery {
  type: "rbac.roles.get";
}

export interface GetCapabilitiesQuery {
  type: "rbac.capabilities.get";
}

export interface GetCapabilityMatrixQuery {
  type: "rbac.matrix.get";
}

export interface GetDomainPermissionsQuery {
  type: "rbac.domainPermissions.get";
}
