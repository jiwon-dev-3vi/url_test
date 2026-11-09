const fs = require('node:fs/promises');
const path = require('node:path');
const pages = new Map([['/', 'index.html'], ['/tickets/', 'tickets/index.html'], ['/status/', 'status/index.html']]);
const mime = { '.css': 'text/css', '.js': 'text/javascript', '.html': 'text/html' };

async function serveFrontend(root, pathname, response) {
  const file = pages.get(pathname) || (/^\/assets\/[a-z0-9-]+\.(?:css|js)$/.test(pathname) ? pathname.slice(1) : null);
  if (!file) return false;
  let body;
  try {
    body = await fs.readFile(path.join(root, file));
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
  response.writeHead(200, { 'Content-Type': mime[path.extname(file)] + '; charset=utf-8' });
  response.end(body);
  return true;
}

module.exports = { serveFrontend };
