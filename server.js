const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// The frontend is served at / and the API has a separate health endpoint.
const frontend = path.join(__dirname, 'public', 'index.html');
http.createServer((request, response) => {
  if (request.url === '/api/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ ok: true }));
  }
  if (request.url === '/' && fs.existsSync(frontend)) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(frontend).pipe(response);
  }
  response.writeHead(404);
  response.end('Not found');
}).listen(Number(process.env.APP_PORT || process.env.PORT || 3000), '0.0.0.0');
