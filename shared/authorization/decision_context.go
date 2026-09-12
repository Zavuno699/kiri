
package authorization

type DecisionContext struct {
	Principal string
	Resource  string
	Action    string
}

