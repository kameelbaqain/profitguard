import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const arg = process.argv[index];
  if (arg.startsWith('--')) {
    args.set(arg.slice(2), process.argv[index + 1]);
    index += 1;
  }
}
const port = Number(args.get('port') || 4173);
const host = args.get('host') || '127.0.0.1';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png'
};

function resolveRequest(url) {
  const { pathname } = new URL(url, `http://${host}:${port}`);
  const requestPath = pathname === '/' ? '/index.html' : decodeURIComponent(pathname);
  const filePath = path.normalize(path.join(distRoot, requestPath));

  if (!filePath.startsWith(path.normalize(distRoot))) {
    return null;
  }

  return filePath;
}

const server = http.createServer(async (request, response) => {
  const filePath = resolveRequest(request.url);

  if (!filePath) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const data = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream'
    });
    response.end(data);
  } catch {
    const html = await readFile(path.join(distRoot, 'index.html'));
    response.writeHead(200, { 'Content-Type': contentTypes['.html'] });
    response.end(html);
  }
});

server.listen(port, host, () => {
  console.log(`The Profit Guard is running at http://${host}:${port}/`);
});
