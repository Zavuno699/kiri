
package reconciliation

type ReconciliationDifference struct {
	Field    string
	Expected any
	Actual   any
}

