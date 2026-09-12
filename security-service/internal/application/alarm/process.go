package alarm

type ProcessAlarmCommand struct {
	AlarmID    string
	SubjectID  string
	Type       string
	Severity   string
}
