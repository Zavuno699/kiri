
package ratelimit

type RateLimitPolicy struct {
	Name      string
	Limit     int
	WindowSec int
}

