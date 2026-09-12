
package controlplane

type ReadinessSnapshot struct {
	Ready   bool
	Reasons []string
}

