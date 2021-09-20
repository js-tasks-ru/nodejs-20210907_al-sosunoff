import url, { URL } from 'url';
import http from 'http';
import path from 'path';
import fs from 'fs';

const server = new http.Server();

server.on('request', async (req, res) => {
  const url = new URL(req.url ?? '', `http://${req.headers.host}`);

  const pathname = url.pathname.slice(1);

  if (pathname.split('/').length > 1) {
    res.statusCode = 400;
    res.end('Nesting is not supported');
    return;
  }

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET': {
      const streamRead = fs.createReadStream(filepath);

      streamRead.pipe(res);

      streamRead.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('File not found');
          return;
        }

        res.statusCode = 500;
        res.end('Server is not');
      });

      break;
    }

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

export default server;
