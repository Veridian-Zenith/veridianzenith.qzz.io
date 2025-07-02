import http.server
import ssl
import os
import json
import time
import requests
from urllib.parse import urlparse, parse_qs, urlencode

PORT = 777
DOCUMENT_ROOT = "/run/media/dae/DaeDev/git/vz.strangled.net"
CERT_FILE = "/etc/letsencrypt/live/vz.strangled.net/fullchain.pem"
KEY_FILE = "/etc/letsencrypt/live/vz.strangled.net/privkey.pem"

PIHOLE_API_URL = "https://vz.strangled.net"
APP_PASSWORD = "/n0EoCUzQmfk+X3++3zGHn+WzGSksWVBHgfKELeItRo="

DEBUG = True

def debug_log(*args):
    if DEBUG:
        print(*args)

class PiHoleAPI:
    def __init__(self):
        self.sid = None
        self.expiry = 0
        self.authenticate()

    def authenticate(self):
        debug_log("[PiHoleAPI] Authenticating...")
        try:
            resp = requests.post(
                f"{PIHOLE_API_URL}/api/auth",
                json={"password": APP_PASSWORD},
                verify=True,
                timeout=5,
            )
            resp.raise_for_status()
            data = resp.json()
            if data.get("session", {}).get("valid"):
                self.sid = data["session"]["sid"]
                self.expiry = time.time() + data["session"]["validity"]
                debug_log("[PiHoleAPI] SID obtained:", self.sid)
            else:
                raise Exception("Authentication failed: invalid response")
        except Exception as e:
            debug_log("[PiHoleAPI] Authentication error:", e)
            raise

    def get_sid(self):
        if not self.sid or time.time() > self.expiry:
            debug_log("[PiHoleAPI] SID expired or missing, reauthenticating...")
            self.authenticate()
        return self.sid

    def request(self, method, endpoint, data=None):
        headers = {}
        if not endpoint.startswith("/api/auth"):
            headers["X-FTL-SID"] = self.get_sid()

        url = f"{PIHOLE_API_URL}{endpoint}"
        debug_log(f"[PiHoleAPI] {method} {url} Data: {data} Headers: {headers}")

        try:
            if method == "GET":
                resp = requests.get(url, headers=headers, verify=True, timeout=10)
            else:  # POST
                resp = requests.post(url, headers=headers, json=data, verify=True, timeout=10)
            resp.raise_for_status()
            debug_log(f"[PiHoleAPI] Response status: {resp.status_code}")
            return resp
        except Exception as e:
            debug_log(f"[PiHoleAPI] Request error: {e}")
            raise

class ProxyHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        endpoint = parsed.path

        if endpoint.startswith("/api/"):
            try:
                # Remove 'sid' from query params if present
                query_params = parse_qs(parsed.query)
                query_params.pop("sid", None)
                query_str = urlencode(query_params, doseq=True)
                proxied_endpoint = endpoint
                if query_str:
                    proxied_endpoint += "?" + query_str

                pihole_resp = self.server.pihole_api.request("GET", proxied_endpoint)

                self.send_response(pihole_resp.status_code)
                for k, v in pihole_resp.headers.items():
                    # Filter out headers that break HTTP protocol for client
                    if k.lower() not in ["content-encoding", "transfer-encoding", "connection"]:
                        self.send_header(k, v)
                self.end_headers()
                self.wfile.write(pihole_resp.content)
            except Exception as e:
                self.send_error(500, f"API request failed: {e}")

        else:
            # Serve static files
            try:
                fs_path = os.path.join(DOCUMENT_ROOT, endpoint.lstrip("/"))
                if os.path.isfile(fs_path):
                    self.send_response(200)
                    self.send_header("Content-Type", self.guess_type(fs_path))
                    self.send_header("Content-Length", str(os.path.getsize(fs_path)))
                    self.end_headers()
                    with open(fs_path, "rb") as f:
                        self.wfile.write(f.read())
                else:
                    self.send_error(404, "File not found")
            except Exception as e:
                self.send_error(500, f"File serving error: {e}")

    def do_POST(self):
        parsed = urlparse(self.path)
        endpoint = parsed.path

        if endpoint.startswith("/api/"):
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                post_data = self.rfile.read(content_length) if content_length > 0 else b""
                payload = json.loads(post_data) if post_data else None

                # Do NOT add SID into POST payload, it's sent in headers
                pihole_resp = self.server.pihole_api.request("POST", endpoint, data=payload)

                self.send_response(pihole_resp.status_code)
                for k, v in pihole_resp.headers.items():
                    if k.lower() not in ["content-encoding", "transfer-encoding", "connection"]:
                        self.send_header(k, v)
                self.end_headers()
                self.wfile.write(pihole_resp.content)
            except Exception as e:
                self.send_error(500, f"API request failed: {e}")
        else:
            self.send_error(405, "POST not supported on this path")

    def guess_type(self, path):
        import mimetypes
        if not mimetypes.inited:
            mimetypes.init()
        extensions_map = mimetypes.types_map.copy()
        extensions_map.update({
            '': 'application/octet-stream',  # Default
            '.py': 'text/plain',
            '.c': 'text/plain',
            '.h': 'text/plain',
        })
        base, ext = os.path.splitext(path)
        return extensions_map.get(ext, 'application/octet-stream')

if __name__ == "__main__":
    server_addr = ('0.0.0.0', PORT)
    httpd = http.server.HTTPServer(server_addr, ProxyHTTPRequestHandler)

    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)
    httpd.socket = ssl_context.wrap_socket(httpd.socket, server_side=True)

    httpd.pihole_api = PiHoleAPI()

    print(f"🚀 Secure Python Web Server running on https://0.0.0.0:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
        print("Server stopped.")
