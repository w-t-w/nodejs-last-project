const koa = require('koa');
const path = require('path');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

const client = require('./lib/client');
const template = require('./template');

const PORT = 7777;

const app = new koa();

app.use(koaMount('/static', koaStatic(path.resolve(__dirname, './source/static'))));

app.use(koaMount('/favicon.ico', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = '';
    return true;
}));

app.use(koaMount('/', async ctx => {
    const {request, response} = ctx;
    const query = request.query;
    if (!query.column_id) {
        response.status = 400;
        response.body = 'url 地址必须填写 column_id';
        return false;
    }

    const column_id = query.column_id;
    const result = await new Promise((resolve, reject) => {
        client.write({
            columnId: column_id
        }, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });

    const detailTemplate = template(path.resolve(__dirname, './template/index.html'));
    const detailResult = detailTemplate(result);
    response.status = 200;
    response.body = detailResult;
}));

app.listen(PORT, () => {
    console.log(`The client is running at http://localhost:${PORT}!`);
});