const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7777;

const leak = [];

const downloadFilePath = path.resolve(__dirname, './index.html');

const buffer = fs.readFileSync(downloadFilePath, 'utf-8');

const server = http.createServer((req, res) => {
    // setTimeout(() => {
    // leak.push(buffer);
    res.writeHead(200, {contentType: 'text/html'});
    res.end(buffer);
    // }, 50);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});