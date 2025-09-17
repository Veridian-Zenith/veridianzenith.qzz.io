import os
import http.server
import mimetypes
import ssl

PORT = 2087
DOCUMENT_ROOT = "/home/dae/Gamez/Dev/vz.strangled.net"  # Keep serving your project files

# Use the qzz.io certificate instead
CERT_FILE = "/etc/letsencrypt/live/veridianzenith.qzz.io/fullchain.pem"
KEY_FILE = "/etc/letsencrypt/live/veridianzenith.qzz.io/privkey.pem"

class SimpleHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        requested_path = self.path.split('?', 1)[0].lstrip('/')
        safe_path = os.path.normpath(requested_path)
        if safe_path.startswith(".."):
            self.send_error(403, "Forbidden")
            return

        fs_path = os.path.join(DOCUMENT_ROOT, safe_path)

        if os.path.isdir(fs_path):
            fs_path = os.path.join(fs_path, 'index.html')

        if os.path.isfile(fs_path):
            self.send_response(200)
            content_type = mimetypes.guess_type(fs_path)[0] or 'application/octet-stream'
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(os.path.getsize(fs_path)))
            self.end_headers()

            with open(fs_path, "rb") as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404, "File not found")

    def do_POST(self):
        self.send_error(405, "POST not supported")

if __name__ == "__main__":
    server_addr = ('0.0.0.0', PORT)
    httpd = http.server.HTTPServer(server_addr, SimpleHTTPRequestHandler)

    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain(certfile=CERT_FILE, keyfile=KEY_FILE)
    httpd.socket = ssl_context.wrap_socket(httpd.socket, server_side=True)

    print(f"🚀 HTTPS Server ready on https://0.0.0.0:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
        print("Server stopped.")
