const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7777;

const buffer = fs.readFileSync(path.resolve(__dirname, './index.html'));

const server = http.createServer((req, res) => {
    res.writeHead(200, {contentType: 'text/html'});
    res.end(buffer);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
