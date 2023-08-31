const koa = require('koa');
const fs = require('fs');
const path = require('path');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

const PORT = 7777;

const app = new koa();

app.use(koaStatic(path.resolve(__dirname, 'source')));

app.use(koaMount('/favicon.ico', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = '';
    return true;
}));

app.use(koaMount('/', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = fs.readFileSync(path.resolve(__dirname, './source/index.html'), 'utf-8');
}));

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});