curl -X POST http://localhost:5173/posts \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic 1745433875083" \
    -d '{"title": "test-post", "description": "this is a curl test post"}' -v