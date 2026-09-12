package bootstrap

type ContainerResources struct {
	CPURequest    string
	MemoryRequest string
	CPULimit      string
	MemoryLimit   string
}

func DefaultContainerResources() ContainerResources {
	return ContainerResources{
		CPURequest:    "100m",
		MemoryRequest: "128Mi",
		CPULimit:      "1000m",
		MemoryLimit:   "512Mi",
	}
}
