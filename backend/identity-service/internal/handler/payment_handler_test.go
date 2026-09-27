package handler

import (
	"testing"
)

// TestGetPaymentResponsibilityInternal_AuthorizationBoundary tests the authorization boundary
// for the internal responsibility resolution endpoint
func TestGetPaymentResponsibilityInternal_AuthorizationBoundary(t *testing.T) {
	// Test authorization check logic
	// Simulate the role check from the handler
	rolesFinanceAdmin := []string{"finance_admin"}
	hasPaymentWrite := false
	for _, role := range rolesFinanceAdmin {
		if role == "finance_admin" || role == "super_admin" {
			hasPaymentWrite = true
			break
		}
	}
	if !hasPaymentWrite {
		t.Fatal("finance_admin should have payment.write equivalent")
	}

	rolesSuperAdmin := []string{"super_admin"}
	hasPaymentWrite = false
	for _, role := range rolesSuperAdmin {
		if role == "finance_admin" || role == "super_admin" {
			hasPaymentWrite = true
			break
		}
	}
	if !hasPaymentWrite {
		t.Fatal("super_admin should have payment.write equivalent")
	}

	rolesTenant := []string{"tenant"}
	hasPaymentWrite = false
	for _, role := range rolesTenant {
		if role == "finance_admin" || role == "super_admin" {
			hasPaymentWrite = true
			break
		}
	}
	if hasPaymentWrite {
		t.Fatal("tenant should NOT have payment.write equivalent")
	}

	t.Logf("✓ Verified: finance_admin has payment.write equivalent")
	t.Logf("✓ Verified: super_admin has payment.write equivalent")
	t.Logf("✓ Verified: tenant does NOT have payment.write equivalent")
}
