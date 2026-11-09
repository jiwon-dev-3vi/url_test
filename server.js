const http = require('node:http');

// The public root route should identify the recovery-was service.
http.createServer((request, response) => {
  if (request.url === '/healthz') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ ok: true }));
  }
  response.writeHead(404);
  response.end('Not found');
}).listen(Number(process.env.APP_PORT || process.env.PORT || 3000), '0.0.0.0');
