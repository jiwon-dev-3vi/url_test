const http = require('node:http');
const { requestHandler, notFound } = require('./lib/http');
const { handleHealth } = require('./routes/health');
const { handleCatalog } = require('./routes/catalog');

http.createServer(requestHandler((url, response) => {
  // GET / is the public API entry. Its response is defined in data/service-info.json.
  if (handleHealth(url, response) || handleCatalog(url, response)) return;
  notFound(response);
})).listen(Number(process.env.APP_PORT || process.env.PORT || 3000), '0.0.0.0');
