const fs = require('fs');
const koa = require('koa');
const mount = require('koa-mount');

const game = require('./game');

const PORT = 7777;

let result = '',
    playerCount = 0,
    lastResult = null,
    sameCount = 0;

const app = new koa();
const gameApp = new koa();

gameApp.use(async (ctx, next) => {
    const {response} = ctx;
    if (playerCount >= 3 || sameCount === 9) {
        response.status = 500;
        response.body = '你太厉害了!我不跟你玩儿了!';
        return false;
    }
    await next();
    if (ctx.playerWon) playerCount++;
});

gameApp.use(async (ctx, next) => {
    await new Promise(resolve => {
        setTimeout(() => {
            const {request} = ctx;
            const query = request.query;
            const action = query.action;
            const resultNumber = game(action);
            switch (resultNumber) {
                case 0:
                    result = '平局!';
                    break;
                case 1:
                    result = '你赢了!';
                    ctx.playerWon = true;
                    break;
                case -1:
                    result = '你输了!';
                    break;
            }
            ctx.action = action;
            ctx.result = result;
            resolve();
        }, 1000);
    });
    await next();
});

gameApp.use(async (ctx, next) => {
    const {response, action, result} = ctx;
    if (lastResult && lastResult === action) {
        sameCount++;
        if (sameCount >= 3) {
            response.status = 400;
            response.body = '你作弊!';
            sameCount = 9;
            return false;
        }
    } else {
        sameCount = 0;
    }
    lastResult = action;
    if (!lastResult) {
        response.status = 400;
        response.body = '';
        return false;
    }
    response.status = 200;
    response.body = result;
});

app.use(
    mount('/favicon.ico', ({request, response}) => {
        response.status = 200;
        response.body = '';
        return false;
    })
);

app.use(
    mount('/game', gameApp)
);

app.use(
    mount('/', ({request, response}) => {
        response.status = 200;
        response.body = fs.readFileSync(`${__dirname}/templates/index.html`, 'utf-8');
    })
);

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});