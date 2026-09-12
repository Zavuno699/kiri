package bootstrap

import (
	"log"
)

type Logger struct{}

func NewLogger() *Logger {
	return &Logger{}
}

func (l *Logger) Info(message string) {
	log.Printf("INFO %s", message)
}

func (l *Logger) Error(message string) {
	log.Printf("ERROR %s", message)
}
