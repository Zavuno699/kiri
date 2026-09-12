
package lifecycle

import "context"

type RuntimeManager struct {
	Components []RuntimeComponent
}

func NewRuntimeManager(components ...RuntimeComponent) *RuntimeManager {
	return &RuntimeManager{Components: components}
}

func (m *RuntimeManager) Start(ctx context.Context) error {
	for _, component := range m.Components {
		if err := component.Start(ctx); err != nil {
			return err
		}
	}
	return nil
}

func (m *RuntimeManager) Stop(ctx context.Context) error {
	for i := len(m.Components) - 1; i >= 0; i-- {
		if err := m.Components[i].Stop(ctx); err != nil {
			return err
		}
	}
	return nil
}

