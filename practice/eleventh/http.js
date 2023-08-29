const http = require('http');
const fs = require('fs');

module.exports = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log(res.writeHead, res.end);
    // res.writeHead(200);
    // res.end('hello geekTime!');
    if (req.url === '/favicon.ico') {
        res.writeHead(200);
        res.end();
        return true;
    }
    // console.log(req.url);
    fs.createReadStream(`${__dirname}/template/index.html`).pipe(res);
});