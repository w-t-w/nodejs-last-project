const fs = require('fs');
const path = require('path');
const EasySocket = require('easy_sock');
const protoBuf = require('protocol-buffers');

const schema = protoBuf(fs.readFileSync(path.resolve(__dirname, '../../proto/data.proto')));

const HOST = '127.0.0.1',
    PORT = 4000,
    TIMEOUT = 500,
    minPackageHeadLength = 8,
    seqLength = 4;

const socket = new EasySocket({
    ip: HOST,
    port: PORT,
    timeout: TIMEOUT,
    keepAlive: true
});

socket.encode = function (data, seq) {
    const body = schema.ColumnRequest.encode(data);
    const bodyLength = body.length;
    const header = Buffer.alloc(minPackageHeadLength);
    header.writeInt32BE(seq);
    header.writeInt32BE(bodyLength, seqLength);
    return Buffer.concat([header, body]);
};

socket.decode = function (buffer) {
    const seq = buffer.readInt32BE();
    const body = buffer.slice(minPackageHeadLength);
    const result = schema.ColumnResponse.decode(body);
    return {
        seq,
        result
    };
};

socket.isReceiveComplete = function (buffer) {
    if (buffer.length <= minPackageHeadLength)
        return 0;
    const bodyLength = buffer.readInt32BE(seqLength);
    if (buffer.length >= bodyLength + minPackageHeadLength)
        return bodyLength + minPackageHeadLength;
    else
        return 0;
};

module.exports = socket;