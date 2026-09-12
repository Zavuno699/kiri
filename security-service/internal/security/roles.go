package security

import "strings"

func HasRole(principal Principal, role string) bool {
	role = strings.TrimSpace(role)

	for _, candidate := range principal.Roles {
		if strings.EqualFold(strings.TrimSpace(candidate), role) {
			return true
		}
	}

	return false
}

func HasPermission(principal Principal, permission string) bool {
	permission = strings.TrimSpace(permission)

	for _, candidate := range principal.Permissions {
		if strings.EqualFold(strings.TrimSpace(candidate), permission) {
			return true
		}
	}

	return false
}
