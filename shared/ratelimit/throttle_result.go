
package ratelimit

type ThrottleResult struct {
	Allowed bool
	Reason  string
}

