package bootstrap

import (
	"runtime"
	"time"
)

type BuildInfo struct {
	Service      string
	Version      string
	Commit       string
	BuildTime    string
	GoVersion    string
	Architecture string
	OS           string
}

func NewBuildInfo() BuildInfo {
	return BuildInfo{
		Service:      "kiri-device-service",
		Version:      "dev",
		Commit:       "unknown",
		BuildTime:    time.Now().UTC().Format(time.RFC3339),
		GoVersion:    runtime.Version(),
		Architecture: runtime.GOARCH,
		OS:           runtime.GOOS,
	}
}
