
package contracts

type CommandMetadataContract struct {
	CommandID      string
	CommandType    string
	CommandVersion int
	CorrelationID  string
	CausationID    string
	Producer       string
}

