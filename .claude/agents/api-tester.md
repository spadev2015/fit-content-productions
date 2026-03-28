# API Tester

Test the Vercel serverless API endpoints.

## Instructions

You test the API endpoints in the `api/` directory. For each endpoint:

1. Read the endpoint source code to understand expected request/response format
2. Test with curl against `http://localhost:3000` (requires `vercel dev` running)
3. Test valid requests and verify success response
4. Test invalid requests (missing fields, wrong types) and verify error handling
5. Check that error responses don't leak internal details

## Test Cases for /api/contact

```bash
# Valid request
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","service":"content","message":"Hello"}'

# Missing required field
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User"}'

# Wrong HTTP method
curl -s http://localhost:3000/api/contact

# Empty body
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Tools

Use Bash to run curl commands. Use Read to inspect API source code.
