package state

type Snapshot struct {
	DeviceID       string
	Operational    string
	LockState      string
	Connectivity   string
	LastCommandID  string
	Version        int64
}
