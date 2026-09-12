package service

import "testing"

type fakeHealthProvider struct {
	name    string
	healthy bool
}

func (p fakeHealthProvider) Name() string {
	return p.name
}

func (p fakeHealthProvider) Healthy() bool {
	return p.healthy
}

func TestDeviceHealthAggregatorRequiresProviders(t *testing.T) {
	aggregator := NewDeviceHealthAggregator()

	_, err := aggregator.Health()

	if err == nil {
		t.Fatal("expected provider validation error")
	}
}

func TestDeviceHealthAggregatorAllHealthy(t *testing.T) {
	aggregator := NewDeviceHealthAggregator(
		fakeHealthProvider{
			name:    "runtime",
			healthy: true,
		},
		fakeHealthProvider{
			name:    "worker",
			healthy: true,
		},
	)

	report, err := aggregator.Health()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if !report.Healthy {
		t.Fatal("expected healthy report")
	}

	if !report.Checks["runtime"] || !report.Checks["worker"] {
		t.Fatal("expected provider checks")
	}
}

func TestDeviceHealthAggregatorUnhealthyProvider(t *testing.T) {
	aggregator := NewDeviceHealthAggregator(
		fakeHealthProvider{
			name:    "runtime",
			healthy: true,
		},
		fakeHealthProvider{
			name:    "worker",
			healthy: false,
		},
	)

	report, err := aggregator.Health()

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if report.Healthy {
		t.Fatal("expected unhealthy report")
	}

	if report.Checks["worker"] {
		t.Fatal("expected unhealthy worker state")
	}
}
