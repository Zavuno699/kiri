package service

import "context"

type DeviceDiagnostics struct {
	Dependencies *DeviceServiceDependencies
	Runtime      *DeviceRuntimeState
	Integration  *DeviceServiceIntegrationRuntime
}

func NewDeviceDiagnostics(
	dependencies *DeviceServiceDependencies,
	runtime *DeviceRuntimeState,
	integration *DeviceServiceIntegrationRuntime,
) *DeviceDiagnostics {
	return &DeviceDiagnostics{
		Dependencies: dependencies,
		Runtime:      runtime,
		Integration:  integration,
	}
}

func (d *DeviceDiagnostics) Snapshot(
	ctx context.Context,
) (DeviceHealthSnapshot, error) {
	if err := d.Integration.Start(ctx); err != nil {
		return NewDeviceHealthSnapshot(
			"failed",
			map[string]bool{
				"runtime":     d.Runtime.Running(),
				"integration": false,
			},
		), err
	}

	return NewDeviceHealthSnapshot(
		"ready",
		map[string]bool{
			"runtime":     d.Runtime.Running(),
			"integration": true,
		},
	), nil
}
