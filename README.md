---

# 🌐 `vz.strangled.net` API Guide

Welcome! This guide will help you interact with the Veridian Zenith API. Please follow the instructions carefully to ensure proper usage and avoid lockouts.

---

## ⚖️ Legal Disclaimer

**Veridian Zenith** is a digital label and project organization operated by **Jeremy Matlock**, also known as **Dae Euhwa**.
All works published under this name are the intellectual property of Jeremy Matlock unless otherwise stated.

---

## 🖥️ Website Access

Visit the main site here:
🔗 [https://vz.strangled.net:777/](https://vz.strangled.net:777/)

---

## 🔐 Authentication & API Usage

### You **must** provide your own **SID** to use the API.

---

### 🔑 How to Obtain Your SID

To authenticate via CLI, make a POST request:

```bash
curl -X POST "https://vz.strangled.net/api/auth" --data '{"password":"your-password"}'
```

> **⚠️ Warning:**
>
> * POST access requires explicit permission from **Dae Euhwa**.
> * Sharing passwords or using POST without authorization will immediately revoke access and reset credentials.

---

### ✅ Example JSON Response

```json
{
  "session": {
    "valid": true,
    "totp": true,
    "sid": "***",           // Your session ID — required for all requests
    "csrf": "***",
    "validity": 1800,       // In seconds (30 minutes)
    "message": "***"
  },
  "took": 0.000014305114746093
}
```

---

## 📡 Using the API with Your SID

Include your **SID** as either:

* A **query parameter**, or
* A **header** (if supported by your client/tooling)

---

### 🔍 Example: Check DNS Blocking Status

```bash
curl -X GET "https://vz.strangled.net/api/dns/blocking?sid=<Your SID>"
```

---

### 📥 Example Response

```bash
❯ curl -X GET "https://vz.strangled.net/api/dns/blocking?sid=53p27a******"

{
  "blocking": "enabled",
  "timer": null,
  "took": 3.0279159545898438e-05
}
```

---

## 🚪 Logging Out (Ending Your Session)

To terminate your session and invalidate the SID:

```bash
curl -X DELETE "https://vz.strangled.net/api/auth?sid=<Your SID>"
```

---

## ⚠️ Troubleshooting & Contact

* If the API or website is unresponsive, it may be:

  * Temporarily offline
  * Experiencing SSL issues (expired or invalid certs)
* For direct support, contact:
  📧 **[daedaevibin@naver.com](mailto:daedaevibin@naver.com)**

---