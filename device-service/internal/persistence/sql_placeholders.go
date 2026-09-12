package persistence

import "strings"

// RebindQuestionPlaceholders converts simple database/sql-style '?' placeholders
// into PostgreSQL/pgx positional placeholders. It deliberately skips quoted
// strings containing literal question marks.
func RebindQuestionPlaceholders(query string) string {
	var builder strings.Builder
	builder.Grow(len(query) + 16)

	index := 0
	inSingle := false
	inDouble := false
	inBacktick := false

	for i := 0; i < len(query); i++ {
		ch := query[i]

		switch ch {
		case '\'':
			if !inDouble && !inBacktick {
				if inSingle && i+1 < len(query) && query[i+1] == '\'' {
					builder.WriteByte(ch)
					builder.WriteByte(query[i+1])
					i++
					continue
				}

				inSingle = !inSingle
			}

			builder.WriteByte(ch)

		case '"':
			if !inSingle && !inBacktick {
				inDouble = !inDouble
			}

			builder.WriteByte(ch)

		case '`':
			if !inSingle && !inDouble {
				inBacktick = !inBacktick
			}

			builder.WriteByte(ch)

		case '?':
			if !inSingle && !inDouble && !inBacktick {
				index++
				builder.WriteByte('$')
				builder.WriteString(itoa(index))
				continue
			}

			builder.WriteByte(ch)

		default:
			builder.WriteByte(ch)
		}
	}

	return builder.String()
}

func itoa(value int) string {
	if value == 0 {
		return "0"
	}

	var buf [20]byte
	index := len(buf)

	for value > 0 {
		index--
		buf[index] = byte('0' + value%10)
		value /= 10
	}

	return string(buf[index:])
}
