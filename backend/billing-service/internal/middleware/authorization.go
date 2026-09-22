package middleware

import (
	"errors"
	"net/http"
)

var (
	ErrUnauthorized = errors.New("unauthorized")
	ErrForbidden    = errors.New("forbidden")
)

// Role and Scope types from security-service
type Role string

const (
	RoleTenant        Role = "tenant"
	RoleLandlord      Role = "landlord"
	RoleService       Role = "service"
	RoleDevice        Role = "device"
	RoleOperator      Role = "operator"
	RoleSecurityAdmin Role = "security_admin"
	RoleFinanceAdmin  Role = "finance_admin"
	RoleDeviceAdmin   Role = "device_admin"
	RoleAuditAdmin    Role = "audit_admin"
	RoleSuperAdmin    Role = "super_admin"
)

type Scope string

const (
	ScopeLeaseRead          Scope = "lease.read"
	ScopeLeaseWrite         Scope = "lease.write"
	ScopePaymentRead        Scope = "payment.read"
	ScopePaymentWrite       Scope = "payment.write"
	ScopePaymentReconcile   Scope = "payment.reconcile"
	ScopePaymentSettle      Scope = "payment.settle"
	ScopePaymentRefund      Scope = "payment.refund"
	ScopeDeviceRead         Scope = "device.read"
	ScopeDeviceProvision    Scope = "device.provision"
	ScopeDeviceCommand      Scope = "device.command"
	ScopeLockRead           Scope = "lock.read"
	ScopeLockCommand        Scope = "lock.command"
	ScopeFinancialRead      Scope = "financial.read"
	ScopeFinancialConfigure Scope = "financial.configure"
	ScopeSecurityRead       Scope = "security.read"
	ScopeSecurityWrite      Scope = "security.write"
	ScopeAuditRead          Scope = "audit.read"
)

// AuthorizationPolicy maps roles to scopes
type AuthorizationPolicy struct {
	RoleScopes map[Role]map[Scope]struct{}
}

// NewDefaultAuthorizationPolicy creates the default role/scope mapping
func NewDefaultAuthorizationPolicy() AuthorizationPolicy {
	return AuthorizationPolicy{
		RoleScopes: map[Role]map[Scope]struct{}{
			RoleTenant: {
				ScopeLeaseRead:   {},
				ScopePaymentRead: {},
				ScopeLockRead:    {},
			},
			RoleLandlord: {
				ScopeLeaseRead:   {},
				ScopeLeaseWrite:  {},
				ScopePaymentRead: {},
				ScopeLockRead:    {},
				ScopeLockCommand: {},
				ScopeDeviceRead:  {},
			},
			RoleService: {
				ScopeLeaseRead:        {},
				ScopeLeaseWrite:       {},
				ScopePaymentRead:      {},
				ScopePaymentReconcile: {},
				ScopePaymentSettle:    {},
				ScopeDeviceRead:       {},
				ScopeDeviceCommand:    {},
				ScopeLockRead:         {},
				ScopeLockCommand:      {},
				ScopeSecurityRead:     {},
				ScopeAuditRead:        {},
			},
			RoleOperator: {
				ScopeLeaseRead:    {},
				ScopePaymentRead:  {},
				ScopeDeviceRead:   {},
				ScopeLockRead:     {},
				ScopeSecurityRead: {},
				ScopeAuditRead:    {},
			},
			RoleSecurityAdmin: {
				ScopeSecurityRead:  {},
				ScopeSecurityWrite: {},
				ScopeAuditRead:     {},
				ScopeDeviceRead:    {},
			},
			RoleFinanceAdmin: {
				ScopePaymentRead:      {},
				ScopePaymentWrite:     {},
				ScopePaymentReconcile: {},
				ScopePaymentSettle:    {},
				ScopePaymentRefund:    {},
				ScopeFinancialRead:    {},
				ScopeAuditRead:        {},
			},
			RoleDeviceAdmin: {
				ScopeDeviceRead:      {},
				ScopeDeviceProvision: {},
				ScopeDeviceCommand:   {},
				ScopeLockRead:        {},
				ScopeLockCommand:     {},
				ScopeAuditRead:       {},
			},
			RoleAuditAdmin: {
				ScopeAuditRead:    {},
				ScopeSecurityRead: {},
			},
			RoleSuperAdmin: {
				ScopeLeaseRead:          {},
				ScopeLeaseWrite:         {},
				ScopePaymentRead:        {},
				ScopePaymentWrite:       {},
				ScopePaymentReconcile:   {},
				ScopePaymentSettle:      {},
				ScopePaymentRefund:      {},
				ScopeFinancialRead:      {},
				ScopeFinancialConfigure: {},
				ScopeDeviceRead:         {},
				ScopeDeviceProvision:    {},
				ScopeDeviceCommand:      {},
				ScopeLockRead:           {},
				ScopeLockCommand:        {},
				ScopeSecurityRead:       {},
				ScopeSecurityWrite:      {},
				ScopeAuditRead:          {},
			},
		},
	}
}

// Allows checks if the given roles have the required scope
func (p AuthorizationPolicy) Allows(roles []Role, scope Scope) bool {
	for _, role := range roles {
		scopes := p.RoleScopes[role]
		if _, ok := scopes[scope]; ok {
			return true
		}
	}
	return false
}

// AuthorizationMiddleware enforces role/scope-based authorization
type AuthorizationMiddleware struct {
	requiredScope Scope
	policy        AuthorizationPolicy
}

// NewAuthorizationMiddleware creates a new authorization middleware
func NewAuthorizationMiddleware(requiredScope Scope) *AuthorizationMiddleware {
	return &AuthorizationMiddleware{
		requiredScope: requiredScope,
		policy:        NewDefaultAuthorizationPolicy(),
	}
}

// Authorize checks if the authenticated subject has the required scope
func (m *AuthorizationMiddleware) Authorize(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		subject, err := AuthenticatedSubjectFromContext(r.Context())
		if err != nil {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		// Convert roles to Role type
		roles := make([]Role, len(subject.Roles))
		for i, role := range subject.Roles {
			roles[i] = Role(role)
		}

		// Check if subject has required scope
		if !m.policy.Allows(roles, m.requiredScope) {
			http.Error(w, "forbidden", http.StatusForbidden)
			return
		}

		// Call next handler
		next.ServeHTTP(w, r)
	})
}
