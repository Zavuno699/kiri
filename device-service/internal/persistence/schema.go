package persistence

const Schema = `
CREATE TABLE IF NOT EXISTS devices (
	id TEXT PRIMARY KEY,
	status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS device_events (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	topic TEXT NOT NULL,
	message_key TEXT NOT NULL,
	payload BLOB NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
