const { sendJson, notFound } = require('../lib/http');
const { listServices, getService, listIncidents, overview } = require('../lib/catalog');

function handleCatalog(url, response) {
  if (url.pathname === '/api/v1/services') {
    const status = url.searchParams.get('status');
    if (status && !['operational', 'degraded', 'maintenance'].includes(status)) {
      sendJson(response, 400, { error: 'invalid_status' });
    } else {
      sendJson(response, 200, { items: listServices({ status, category: url.searchParams.get('category') }) });
    }
    return true;
  }
  const service = /^\/api\/v1\/services\/([a-z0-9-]+)$/.exec(url.pathname);
  if (service) {
    const item = getService(service[1]);
    if (item) sendJson(response, 200, { item });
    else notFound(response);
    return true;
  }
  if (url.pathname === '/api/v1/incidents') {
    sendJson(response, 200, { items: listIncidents(url.searchParams.get('status')) });
    return true;
  }
  if (url.pathname === '/api/v1/overview') {
    sendJson(response, 200, overview());
    return true;
  }
  return false;
}

module.exports = { handleCatalog };
