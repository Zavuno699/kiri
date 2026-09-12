package persistence

import (
	"context"
	"time"
)

type DatabaseHealth struct {
	Reachable        bool
	Latency          time.Duration
	OpenConnections  int
	IdleConnections  int
	InUseConnections int
}

func CheckDatabaseHealth(
	ctx context.Context,
	database *Database,
) DatabaseHealth {
	if database == nil || database.DB == nil {
		return DatabaseHealth{}
	}

	start := time.Now()

	if err := database.Ping(ctx); err != nil {
		return DatabaseHealth{
			Reachable: false,
			Latency:   time.Since(start),
		}
	}

	stats := database.DB.Stats()

	return DatabaseHealth{
		Reachable:        true,
		Latency:          time.Since(start),
		OpenConnections:  stats.OpenConnections,
		IdleConnections:  stats.Idle,
		InUseConnections: stats.InUse,
	}
}
