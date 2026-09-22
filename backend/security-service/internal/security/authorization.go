package security

import (
	"errors"
)

var (
	ErrUnauthorized = errors.New("unauthorized")
	ErrForbidden    = errors.New("forbidden")
)

type AuthorizationPolicy struct {
	RoleScopes map[Role]PermissionSet
}

func NewDefaultAuthorizationPolicy() AuthorizationPolicy {
	return AuthorizationPolicy{
		RoleScopes: map[Role]PermissionSet{
			RoleTenant: NewPermissionSet(
				ScopeLeaseRead,
				ScopePaymentRead,
				ScopeLockRead,
			),
			RoleLandlord: NewPermissionSet(
				ScopeLeaseRead,
				ScopeLeaseWrite,
				ScopePaymentRead,
				ScopeLockRead,
				ScopeLockCommand,
				ScopeDeviceRead,
			),
			RoleService: NewPermissionSet(
				ScopeLeaseRead,
				ScopeLeaseWrite,
				ScopePaymentRead,
				ScopePaymentReconcile,
				ScopePaymentSettle,
				ScopeDeviceRead,
				ScopeDeviceCommand,
				ScopeLockRead,
				ScopeLockCommand,
				ScopeSecurityRead,
				ScopeAuditRead,
			),
			RoleOperator: NewPermissionSet(
				ScopeLeaseRead,
				ScopePaymentRead,
				ScopeDeviceRead,
				ScopeLockRead,
				ScopeSecurityRead,
				ScopeAuditRead,
			),
			RoleSecurityAdmin: NewPermissionSet(
				ScopeSecurityRead,
				ScopeSecurityWrite,
				ScopeAuditRead,
				ScopeDeviceRead,
			),
			RoleFinanceAdmin: NewPermissionSet(
				ScopePaymentRead,
				ScopePaymentWrite,
				ScopePaymentReconcile,
				ScopePaymentSettle,
				ScopePaymentRefund,
				ScopeFinancialRead,
				ScopeAuditRead,
			),
			RoleDeviceAdmin: NewPermissionSet(
				ScopeDeviceRead,
				ScopeDeviceProvision,
				ScopeDeviceCommand,
				ScopeLockRead,
				ScopeLockCommand,
				ScopeAuditRead,
			),
			RoleAuditAdmin: NewPermissionSet(
				ScopeAuditRead,
				ScopeSecurityRead,
			),
			RoleSuperAdmin: NewPermissionSet(
				ScopeLeaseRead,
				ScopeLeaseWrite,
				ScopePaymentRead,
				ScopePaymentReconcile,
				ScopePaymentSettle,
				ScopeFinancialRead,
				ScopeFinancialConfigure,
				ScopeDeviceRead,
				ScopeDeviceProvision,
				ScopeDeviceCommand,
				ScopeLockRead,
				ScopeLockCommand,
				ScopeSecurityRead,
				ScopeSecurityWrite,
				ScopeAuditRead,
			),
		},
	}
}

func (p AuthorizationPolicy) Allows(
	roles []Role,
	scope Scope,
) bool {
	for _, role := range roles {
		scopes := p.RoleScopes[role]

		if scopes.Has(scope) {
			return true
		}
	}

	return false
}

func Authorize(
	claims Claims,
	policy AuthorizationPolicy,
	scope Scope,
	now interface{ String() string },
) error {
	_ = now

	if claims.Subject == "" ||
		claims.SessionID == "" ||
		claims.CredentialID == "" {
		return ErrUnauthorized
	}

	if !policy.Allows(claims.Roles, scope) &&
		!claims.HasScope(scope) {
		return ErrForbidden
	}

	return nil
}
