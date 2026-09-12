package persistence

type DatabaseConfig struct {
	Driver string
	DSN    string
}

func NewDatabaseConfig(
	driver string,
	dsn string,
) DatabaseConfig {
	return DatabaseConfig{
		Driver: driver,
		DSN:    dsn,
	}
}
