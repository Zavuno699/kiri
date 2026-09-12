package service

import "errors"

type DeviceHealthAggregator struct {
	providers []DeviceHealthProvider
}

type AggregatedHealth struct {
	Healthy bool
	Checks  map[string]bool
}

func NewDeviceHealthAggregator(
	providers ...DeviceHealthProvider,
) *DeviceHealthAggregator {
	return &DeviceHealthAggregator{
		providers: providers,
	}
}

func (a *DeviceHealthAggregator) Health() (AggregatedHealth, error) {
	if len(a.providers) == 0 {
		return AggregatedHealth{}, errors.New("no health providers registered")
	}

	result := AggregatedHealth{
		Healthy: true,
		Checks:  make(map[string]bool),
	}

	for _, provider := range a.providers {
		healthy := provider.Healthy()

		result.Checks[provider.Name()] = healthy

		if !healthy {
			result.Healthy = false
		}
	}

	return result, nil
}
