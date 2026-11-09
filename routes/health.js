const { sendJson } = require('../lib/http');

function handleHealth(url, response) {
  if (url.pathname === '/healthz') {
    sendJson(response, 200, { ok: true, service: 'northstar-catalog' });
    return true;
  }
  if (url.pathname === '/readyz') {
    sendJson(response, 200, { ready: true, dependencies: { catalog: 'available', incidents: 'available' } });
    return true;
  }
  return false;
}

module.exports = { handleHealth };
