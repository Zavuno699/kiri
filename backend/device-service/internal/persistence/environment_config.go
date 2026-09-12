package persistence

import "os"

func NewEnvironmentConfig() DatabaseConfig {
	driver := os.Getenv("DEVICE_DB_DRIVER")
	dsn := os.Getenv("DEVICE_DB_DSN")

	return NewDatabaseConfig(
		driver,
		dsn,
	)
}
