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
# Valid request (Contact form — all fields)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","igProfile":"@testuser","phoneNumber":"555-0100","service":"content","message":"Hello"}'

# Valid request (PromoModal payload — hardcoded service/message)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","igProfile":"@testuser","phoneNumber":"555-0100","service":"Free Shooting Promo","message":"Submitted via free shooting promo popup."}'

# Optional fields omitted (only required: firstName, email, service)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com","service":"content"}'

# Missing required field (no firstName)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","service":"content"}'

# Missing required field (no email)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","service":"content"}'

# Missing required field (no service)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com"}'

# Wrong HTTP method
curl -s http://localhost:3000/api/contact

# Empty body
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Resend Setup Verification

The `/api/contact` endpoint uses [Resend](https://resend.com) to send emails. Before running tests, verify Resend is configured:

1. Ensure `RESEND_API_KEY` is set in `.env` (replace `re_xxxxxxxxx` with your real API key)
2. Ensure `NOTIFICATION_EMAIL` is set (e.g. `fitcontentproductions@gmail.com`)

Quick standalone test to verify Resend connectivity (Node.js):

```javascript
import { Resend } from 'resend';

const resend = new Resend('re_xxxxxxxxx'); // replace with real API key

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'fitcontentproductions@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
```

In production, the API key is read from `process.env.RESEND_API_KEY` — never hardcode it in source code.

## Tools

Use Bash to run curl commands. Use Read to inspect API source code.
