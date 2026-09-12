package service

import "time"

type PaymentReconciliationRuntimeConfig struct {
	Interval  time.Duration
	BatchSize int
}

func DefaultPaymentReconciliationRuntimeConfig() PaymentReconciliationRuntimeConfig {
	return PaymentReconciliationRuntimeConfig{
		Interval:  30 * time.Second,
		BatchSize: 50,
	}
}

func (c PaymentReconciliationRuntimeConfig) Normalize() PaymentReconciliationRuntimeConfig {
	if c.Interval <= 0 {
		c.Interval = 30 * time.Second
	}

	if c.BatchSize <= 0 {
		c.BatchSize = 50
	}

	if c.BatchSize > 1000 {
		c.BatchSize = 1000
	}

	return c
}
