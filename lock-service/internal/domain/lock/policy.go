package lock

type Policy struct {
	AllowRemoteUnlock bool
	AllowEmergency    bool
	AllowGuestCode    bool
}
