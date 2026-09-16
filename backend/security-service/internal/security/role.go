package security

type Role string

const (
	RoleTenant        Role = "tenant"
	RoleLandlord      Role = "landlord"
	RoleService       Role = "service"
	RoleDevice        Role = "device"
	RoleOperator      Role = "operator"
	RoleSecurityAdmin Role = "security_admin"
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

type PermissionSet map[Scope]struct{}

func NewPermissionSet(scopes ...Scope) PermissionSet {
	result := make(PermissionSet, len(scopes))

	for _, scope := range scopes {
		result[scope] = struct{}{}
	}

	return result
}

func (p PermissionSet) Has(scope Scope) bool {
	_, ok := p[scope]
	return ok
}
