package bootstrap

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func ConfigFingerprint(cfg Config) string {
	redacted := NewRedactedConfig(cfg)

	payload := redacted.ServiceID +
		"|" + redacted.HTTPAddress +
		"|" + redacted.DatabaseDriver +
		"|" + redacted.MessageClientID +
		"|" + redacted.DeviceAddress +
		"|" + fmt.Sprintf("%d", redacted.DeviceTimeoutMS)

	sum := sha256.Sum256([]byte(payload))

	return hex.EncodeToString(sum[:])
}
