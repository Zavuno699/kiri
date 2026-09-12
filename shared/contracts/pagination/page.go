package pagination

type Request struct {
	Limit  int
	Cursor string
}

type Response struct {
	NextCursor string
	HasMore    bool
}
