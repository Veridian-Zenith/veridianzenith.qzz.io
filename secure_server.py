import http.server
import ssl
import os
from urllib.parse import urlparse

PORT = 777
DOCUMENT_ROOT = "/run/media/dae/DaeDev/git/vz.strangled.net"
CERT_FILE = "/etc/letsencrypt/live/vz.strangled.net/fullchain.pem"
KEY_FILE = "/etc/letsencrypt/live/vz.strangled.net/privkey.pem"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        parsed_path = urlparse(path).path
        return os.path.normpath(os.path.join(DOCUMENT_ROOT, parsed_path.lstrip('/')))

    def end_headers(self):
        # 🔐 Required for Matrix Widget compatibility
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("X-Frame-Options", "ALLOWALL")
        self.send_header("Content-Security-Policy", "frame-ancestors * matrix.org app.element.io")
        super().end_headers()

if __name__ == "__main__":
    server_address = ("0.0.0.0", PORT)
    httpd = http.server.HTTPServer(server_address, CustomHandler)

    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    print(f"🚀 Secure Python Web Server running on https://0.0.0.0:{PORT}")
    httpd.serve_forever()
