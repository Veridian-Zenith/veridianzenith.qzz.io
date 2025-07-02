# vz.strangled.net

Please visit the URL below:

[Veridian Zenith](https://vz.strangled.net:777/)

---

## IMPORTANT: You must provide your own SID for API use!

### How to obtain your SID:

You can visit this URL directly from any browser:

```
https://vz.strangled.net/api/auth
```

Or use this POST command (note: **POST access with password is restricted and permission-based**):

```bash
curl -k -X POST -H "Content-Type: application/json" -d '{"password":"<your-app-password>"}' https://vz.strangled.net/api/auth
```

> **Warning:** Developers using POST must have explicit permission from Dae Euhwa. Sharing the password without authorization will result in immediate revocation of all access and a password reset.

---

### Example JSON response:

```json
{
  "session": {
    "valid": true,
    "totp": true,
    "sid": "***",          // This line is important
    "csrf": "***",
    "validity": 1800,      // Valid for 30 minutes
    "message": "***"
  },
  "took": 0.000014305114746093
}
```

---

### Using the API with your SID

To call API endpoints, include the SID in the `X-FTL-SID` header. For example, to check if blocking is enabled:

```bash
curl -k -H "X-FTL-SID:<Insert SID>" "https://vz.strangled.net/api/dns/blocking"
```
---

# A valid example looks like this
```bash
❯ curl -k -H "X-FTL-SID:bdumlu****" "https://vz.strangled.net/api/dns/blocking"

# Response:
{
  "blocking": "enabled",
  "timer": null,
  "took": 6.6280364990234375e-05
}
```
