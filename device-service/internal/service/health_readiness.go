package service

type DeviceLivenessReport struct {
	Alive bool
}

type DeviceReadinessReport struct {
	Ready  bool
	Checks map[string]bool
}

type DeviceHealthReadiness struct {
	aggregator *DeviceHealthAggregator
}

func NewDeviceHealthReadiness(
	aggregator *DeviceHealthAggregator,
) *DeviceHealthReadiness {
	return &DeviceHealthReadiness{
		aggregator: aggregator,
	}
}

func (h *DeviceHealthReadiness) Liveness() DeviceLivenessReport {
	return DeviceLivenessReport{
		Alive: true,
	}
}

func (h *DeviceHealthReadiness) Readiness() (DeviceReadinessReport, error) {
	report, err := h.aggregator.Health()

	if err != nil {
		return DeviceReadinessReport{}, err
	}

	return DeviceReadinessReport{
		Ready:  report.Healthy,
		Checks: report.Checks,
	}, nil
}
