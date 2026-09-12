package persistence

import (
	"context"
	"time"
)

type ConnectionSnapshot struct {
	Reachable          bool
	Latency            time.Duration
	OpenConnections    int
	IdleConnections    int
	InUseConnections   int
	MaxOpenConnections int
}

func NewConnectionSnapshot(
	ctx context.Context,
	database *Database,
) ConnectionSnapshot {
	if database == nil || database.DB == nil {
		return ConnectionSnapshot{}
	}

	start := time.Now()

	if err := database.Ping(ctx); err != nil {
		return ConnectionSnapshot{
			Reachable: false,
			Latency:   time.Since(start),
		}
	}

	stats := database.DB.Stats()

	return ConnectionSnapshot{
		Reachable:          true,
		Latency:            time.Since(start),
		OpenConnections:    stats.OpenConnections,
		IdleConnections:    stats.Idle,
		InUseConnections:   stats.InUse,
		MaxOpenConnections: stats.MaxOpenConnections,
	}
}
