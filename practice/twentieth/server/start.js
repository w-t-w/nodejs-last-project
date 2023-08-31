const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');

const RPC = require('./rpc');
const columns = require('./data/columns');

const PORT = 4000;

const schema = protobuf(fs.readFileSync(path.resolve(__dirname, '../proto/data.proto'), 'utf-8'));

const server = RPC(schema.ColumnResponse, schema.ColumnRequest).createServer((request, response) => {
    const body = request.body;
    console.log(`columnId: ${body.columnId}`);

    response.end({
        column: columns[0],
        recommendColumns: [columns[1], columns[2], columns[3], columns[4]]
    });
});
server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});

