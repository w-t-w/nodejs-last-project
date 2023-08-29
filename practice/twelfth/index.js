const http = require('http');
const url = require('url');
const queryString = require('querystring');
const fs = require('fs');

const game = require('./game');

const PORT = 7777;

let result = '',
    playerCount = 0,
    lastResult = null,
    sameCount = 0;
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const query = queryString.parse(parsedUrl.query);
    const pathname = parsedUrl.pathname;
    if (pathname === '/favicon.ico') {
        res.writeHead(200);
        res.end();
        return true;
    }
    if (pathname === '/game') {
        if (playerCount >= 3 || sameCount === 9) {
            res.writeHead(500);
            res.end('你太厉害了!我不跟你玩儿了!');
            return false;
        }
        const playerAction = query.action;
        const resultNumber = game(playerAction);
        switch (resultNumber) {
            case 0:
                result = '平局!';
                break;
            case 1:
                result = '你赢了!';
                playerCount++;
                break;
            case -1:
                result = '你输了!';
                break;
        }
        if (lastResult && lastResult === playerAction) {
            sameCount++;
            if (sameCount >= 3) {
                res.writeHead(400);
                res.end('你作弊!');
                sameCount = 9;
                return false;
            }
        } else {
            sameCount = 0;
        }
        lastResult = playerAction;
        if (!lastResult) {
            res.writeHead(400);
            res.end();
            return false;
        }
        res.writeHead(200);
        res.end(result);
    }
    if (pathname === '/') {
        fs.createReadStream(`${__dirname}/templates/index.html`).pipe(res);
    }
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});