
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/weather') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      city: 'Chennai',
      temperature: 32,
      condition: 'Sunny',
      humidity: 65,
      wind: 12,
      note: 'Sample weather data'
    }));
    return;
  }

   if (req.url.split('?')[0] !== '/') {
       res.writeHead(404);
       res.end('Not Found');
       return;
    }

  fs.readFile(path.join(__dirname, 'public', 'index.html'),
    (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Unable to load Weather Application');
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(data);
    });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Weather Application running on port ${port}`);
});
