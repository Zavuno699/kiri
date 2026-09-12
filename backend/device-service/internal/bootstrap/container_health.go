package bootstrap

type ContainerHealth struct {
	LivenessPath  string
	ReadinessPath string
	StartupPath   string
}

func DefaultContainerHealth() ContainerHealth {
	return ContainerHealth{
		LivenessPath:  "/health/live",
		ReadinessPath: "/health/ready",
		StartupPath:   "/health/startup",
	}
}
