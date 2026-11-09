function sendJson(response, status, data) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(data));
}
function notFound(response) {
  sendJson(response, 404, { error: 'not_found' });
}
function requestHandler(route) {
  return async (request, response) => {
    try {
      if (request.method !== 'GET') {
        response.setHeader('Allow', 'GET');
        return sendJson(response, 405, { error: 'method_not_allowed' });
      }
      await route(new URL(request.url, 'http://localhost'), response);
    } catch (error) {
      if (response.headersSent) return response.destroy(error);
      sendJson(response, 500, { error: 'internal_error' });
    }
  };
}
module.exports = { sendJson, notFound, requestHandler };
