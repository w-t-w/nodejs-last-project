const fs = require('fs');
const express = require('express');

const game = require('./game');

const PORT = 7777;

let result = '',
    playerCount = 0,
    lastResult = null,
    sameCount = 0;
const app = express();

app.get('/favicon.ico', (req, res) => {
    res.status(200);
    res.send();
});

app.get('/game', async (req, res, next) => {
    if (playerCount >= 3 || sameCount === 9) {
        res.status(500);
        res.send('你太厉害了!我不跟你玩儿了!');
        return false;
    }
    await next();
    if (res.playerWon) {
        playerCount++;
    }
}, async (req, res, next) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            const query = req.query;
            const action = query.action;
            const resultNumber = game(action);
            switch (resultNumber) {
                case 0:
                    result = '平局!';
                    break;
                case 1:
                    result = '你赢了!';
                    res.playerWon = true;
                    break;
                case -1:
                    result = '你输了!';
                    break;
            }
            res.action = action;
            res.result = result;
            resolve();
        }, 1000);
    });
    await next();
}, async (req, res) => {
    const {result, action} = res;
    if (lastResult && lastResult === action) {
        sameCount++;
        if (sameCount >= 3) {
            res.status(400);
            res.send('你作弊!');
            sameCount = 9;
            return false;
        }
    } else {
        sameCount = 0;
    }
    lastResult = action;
    if (!lastResult) {
        res.status(400);
        res.send();
        return false;
    }
    res.status(200);
    res.send(result);
});

app.get('/', (req, res) => {
    res.status(200);
    res.send(fs.readFileSync(`${__dirname}/templates/index.html`, 'utf-8'));
});

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});