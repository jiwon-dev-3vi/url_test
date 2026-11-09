const { sendJson, notFound } = require('../lib/http');
const { searchTickets, summarize } = require('../lib/operations');
const incidents = require('../data/incidents.json');

function handleApi(url, response) {
  if (!url.pathname.startsWith('/api/')) return false;

  switch (url.pathname) {
    case '/api/health': sendJson(response, 200, { ok: true, service: 'operations-portal' }); break;
    case '/api/summary': sendJson(response, 200, summarize()); break;
    case '/api/tickets': sendJson(response, 200, { items: searchTickets(url.searchParams) }); break;
    case '/api/incidents': sendJson(response, 200, { items: incidents }); break;
    default: notFound(response);
  }
  return true;
}

module.exports = { handleApi };
