package freeze

type ApplyFreezeCommand struct {
	DeviceID          string
	LeaseID           string
	Reason            string
	RevokeCredentials bool
}
