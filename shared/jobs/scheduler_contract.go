
package jobs

type SchedulerContract interface {
	Start() error
	Stop() error
}

