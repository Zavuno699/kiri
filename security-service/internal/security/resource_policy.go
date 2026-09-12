package security

type ResourcePolicy struct {
	OwnerOnly    bool
	AllowedRoles []Role
}

func (p ResourcePolicy) Allows(
	identity Identity,
	roles []Role,
) bool {
	if !identity.Active {
		return false
	}

	for _, allowed := range p.AllowedRoles {
		for _, role := range roles {
			if allowed == role {
				return true
			}
		}
	}

	return !p.OwnerOnly
}
