# Email Capture API Contract

**Endpoint:** `POST /.netlify/functions/contact`

## Request Payload
```
{
  "email": "user@example.com",         // required, string, valid email
  "name": "AI Assessment Request",     // required, string, non-empty
  "message": "Requesting AI Assessment"// required, string, non-empty
}
```

- All fields are required. Empty or missing fields will result in a 400 error.
- `email` must be a valid email address.
- `name` and `message` must be non-empty strings.

## Response
- `200` or `204` on success (no content or confirmation)
- `400` on missing/invalid fields

## Example Request
```
curl -X POST https://yourdomain.netlify.app/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"AI Assessment Request","message":"Requesting AI Assessment"}'
```

## Example Error Response
```
HTTP/1.1 400 Bad Request
{
  "error": "Missing required field: name"
}
```

---

**This document is versioned and should be updated if the backend or frontend contract changes.**
