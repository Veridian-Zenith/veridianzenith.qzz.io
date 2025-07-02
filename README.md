# vz.strangled.net API Guide

Welcome! To interact with the API or visit the main site, please use the following links and instructions carefully.

---

## 🌐 Website Access

Visit the main site here:
[vz.strangled.net](https://vz.strangled.net:777/)

---

## 🔐 Authentication & API Usage

### You **must** provide your own SID to use the API.

---

### How to Obtain Your SID

1. **Via browser (simple way):**
   Open this URL to authenticate and get your SID:

   ```
   https://vz.strangled.net/api/auth
   ```

2. **Via command line (POST request):**
   *(Note: POST access requires explicit permission from Dae Euhwa and a password.)*

   ```bash
   curl -X POST "https://pi.hole/api/auth" --data '{"password":"your-password"}'
   ```

   > **⚠️ Warning:**
   > Sharing passwords or using POST without permission will immediately revoke your access and force a password reset. Permission must be obtained from Dae Euhwa.

---

### Example JSON Response After Authentication

```json
{
  "session": {
    "valid": true,
    "totp": true,
    "sid": "***",           // Your session ID - essential for API calls
    "csrf": "***",
    "validity": 1800,       // Session valid for 30 minutes
    "message": "***"
  },
  "took": 0.000014305114746093
}
```

---

### Using the API with Your SID

Include your SID in the request header or as a query parameter when calling API endpoints.

**Example: Check if DNS blocking is enabled**

```bash
curl -X GET "https://pi.hole/api/dns/blocking?sid=<Your SID>"
```

---

### Sample Valid Request & Response

```bash
❯ curl -X GET "https://pi.hole/api/dns/blocking?sid=53p27a******"

{
  "blocking": "enabled",
  "timer": null,
  "took": 3.0279159545898438e-05
}
```

---

### Ending Your Session (Logging Out)

To log out and invalidate your SID:

```bash
curl -X DELETE "https://pi.hole/api/auth?sid=<Your SID>"
```

---

## ⚠️ Troubleshooting

* If the website or API is **not responding**, it might be temporarily down or the SSL certificates need renewal.
* For assistance, contact **Dae Euhwa** at:
  📧 **[daedaevibin@naver.com](mailto:daedaevibin@naver.com)**
