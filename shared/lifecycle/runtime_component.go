
package lifecycle

import "context"

type RuntimeComponent interface {
	Start(context.Context) error
	Stop(context.Context) error
}

