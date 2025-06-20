import http.server
import ssl
import os

PORT = 777
DOCUMENT_ROOT = "/run/media/dae/DaeDev/git/vz.strangled.net"
CERT_FILE = "/etc/letsencrypt/live/vz.strangled.net/fullchain.pem"
KEY_FILE = "/etc/letsencrypt/live/vz.strangled.net/privkey.pem"


class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Safely join the DOCUMENT_ROOT and requested path
        path = os.path.normpath(http.server.urlunparse(http.server.urlparse(path).path))
        full_path = os.path.join(DOCUMENT_ROOT, path.lstrip("/"))
        return full_path


if __name__ == "__main__":
    # Create the HTTP server instance
    server_address = ("0.0.0.0", PORT)
    httpd = http.server.HTTPServer(server_address, CustomHandler)

    # Set up SSL
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    print(f"🚀 Secure Python Web Server running on https://0.0.0.0:{PORT}")
    httpd.serve_forever()

