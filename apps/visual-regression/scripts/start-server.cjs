import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Simple static server using Node builtins
const PORT = 3000;

async function startServer() {
  const http = await import('http');
  const path = await import('path');
  const fs = await import('fs');

  const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const ext = path.parse(filePath).ext;
    const contentTypes: Record<string, string> = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
    };

    try {
      const file = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
      res.end(file);
    } catch (e) {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise<any>((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

startServer();
