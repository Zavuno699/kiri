package bootstrap

type EnvironmentVariableSpec struct {
	Name        string
	Required    bool
	Sensitive   bool
	Description string
}

func DeviceServiceEnvironmentContract() []EnvironmentVariableSpec {
	return []EnvironmentVariableSpec{
		{
			Name:        "DEVICE_SERVICE_ID",
			Required:    false,
			Description: "Stable logical device-service instance identifier",
		},
		{
			Name:        "DEVICE_SERVICE_HTTP_ADDRESS",
			Required:    false,
			Description: "HTTP bind address",
		},
		{
			Name:        "DEVICE_SERVICE_HTTP_PORT",
			Required:    false,
			Description: "HTTP bind port",
		},
		{
			Name:        "DEVICE_DB_DRIVER",
			Required:    false,
			Description: "database/sql driver name",
		},
		{
			Name:        "DEVICE_DB_DSN",
			Required:    false,
			Sensitive:   true,
			Description: "database connection DSN",
		},
		{
			Name:        "DEVICE_DB_MAX_OPEN_CONNS",
			Required:    false,
			Description: "maximum database open connections",
		},
		{
			Name:        "DEVICE_DB_MAX_IDLE_CONNS",
			Required:    false,
			Description: "maximum database idle connections",
		},
		{
			Name:        "DEVICE_DB_MAX_LIFETIME_MINUTES",
			Required:    false,
			Description: "database connection maximum lifetime",
		},
		{
			Name:        "DEVICE_DB_MAX_IDLE_MINUTES",
			Required:    false,
			Description: "database connection maximum idle time",
		},
		{
			Name:        "DEVICE_DB_MIGRATIONS_ENABLED",
			Required:    false,
			Description: "whether database migrations run during startup",
		},
		{
			Name:        "DEVICE_DB_MIGRATION_TIMEOUT_SECONDS",
			Required:    false,
			Description: "migration startup timeout",
		},
		{
			Name:        "DEVICE_MESSAGE_CLIENT_ID",
			Required:    false,
			Description: "messaging client identifier",
		},
		{
			Name:        "DEVICE_ADDRESS",
			Required:    false,
			Description: "device transport address",
		},
		{
			Name:        "DEVICE_TIMEOUT_MS",
			Required:    false,
			Description: "device transport timeout in milliseconds",
		},
		{
			Name:        "KIRI_ENV",
			Required:    false,
			Description: "deployment environment name",
		},
		{
			Name:        "KIRI_SHUTDOWN_TIMEOUT_SECONDS",
			Required:    false,
			Description: "graceful shutdown timeout",
		},
		{
			Name:        "KIRI_READINESS_REQUIRED",
			Required:    false,
			Description: "whether readiness is treated as startup-critical",
		},
		{
			Name:        "KIRI_STARTUP_DIAGNOSTICS",
			Required:    false,
			Description: "whether startup diagnostics are emitted",
		},
	}
}
