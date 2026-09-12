package service

import "context"

type DevicePolicyCommandApplication struct {
	Commands *DeviceCommandApplication
	Policy   *DeviceCommandPolicy
}

func NewDevicePolicyCommandApplication(
	commands *DeviceCommandApplication,
	policy *DeviceCommandPolicy,
) *DevicePolicyCommandApplication {
	return &DevicePolicyCommandApplication{
		Commands: commands,
		Policy:   policy,
	}
}

func (a *DevicePolicyCommandApplication) Execute(
	ctx context.Context,
	request DeviceCommandRequest,
) (DeviceCommandResponse, error) {
	if err := a.Policy.Check(
		request.Command,
	); err != nil {
		return DeviceCommandResponse{}, err
	}

	return a.Commands.Execute(
		ctx,
		request,
	)
}
