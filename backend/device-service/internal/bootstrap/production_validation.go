package bootstrap

func ValidateProductionConfiguration(
	cfg Config,
	production ProductionConfig,
) error {
	if err := cfg.Validate(); err != nil {
		return WrapBootstrapError(
			ErrorClassConfiguration,
			err,
		)
	}

	if err := production.Validate(); err != nil {
		return WrapBootstrapError(
			ErrorClassConfiguration,
			err,
		)
	}

	if err := ValidateDatabaseConfiguration(cfg); err != nil {
		return WrapBootstrapError(
			ErrorClassConfiguration,
			err,
		)
	}

	return nil
}
