const http = require('node:http');
const path = require('node:path');
const { requestHandler, notFound } = require('./lib/http');
const { handleApi } = require('./routes/api');
const { serveFrontend } = require('./routes/frontend');

// The dashboard entry and assets are maintained in frontend/.
const frontendRoot = path.join(__dirname, 'frontend');

http.createServer(requestHandler(async (url, response) => {
  if (handleApi(url, response)) return;
  if (await serveFrontend(frontendRoot, url.pathname, response)) return;
  notFound(response);
})).listen(Number(process.env.APP_PORT || process.env.PORT || 3000), '0.0.0.0');
