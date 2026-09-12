# KiriLock Events

Internal asynchronous events.

Initial event families:

- payment
- lease
- lock
- security
- device

Commands and events must remain conceptually separate.

Examples:

Commands:
- payment.command
- lock.command
- lease.command

Events:
- payment.settled
- payment.failed
- lock.command.result
- lock.state.changed
- lease.lifecycle.events
- security.alarm.tamper
- security.alarm.state
- security.countermeasure
- device.heartbeat
- device.telemetry
