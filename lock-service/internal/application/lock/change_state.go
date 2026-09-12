package lock

type ChangeLockStateCommand struct {
	DeviceID string
	State    string
	Reason   string
}
