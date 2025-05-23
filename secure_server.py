import http.server
import ssl

PORT = 777
DOCUMENT_ROOT = "/home/dae/website/vz.strangled.net"
CERT_FILE = "/etc/letsencrypt/live/vz.strangled.net/fullchain.pem"
KEY_FILE = "/etc/letsencrypt/live/vz.strangled.net/privkey.pem"


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        return DOCUMENT_ROOT + path

# 🔒 Use SSLContext instead of wrap_socket
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)

httpd = http.server.HTTPServer(("192.168.0.253", PORT), Handler)
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print(f"🚀 Secure Python Web Server running on https://192.168.0.253:{PORT}")
httpd.serve_forever()
