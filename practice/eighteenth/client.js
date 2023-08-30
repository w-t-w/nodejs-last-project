const net = require('net');

const PORT = 4000;

const minBodyLength = 6;
const bodyMainLength = 4;
const seqLength = 2;

let seq = 0,
    oldBuffer = null,
    packageLength = null,
    id = null,
    index = null;

const socket = new net.Socket();

socket.connect({
    host: '127.0.0.1',
    port: PORT,
    keepAlive: true
});

const lessonIds = [
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582"
]

socket.on('data', buffer => {
    if (oldBuffer)
        buffer = Buffer.concat([oldBuffer, buffer]);
    while (packageLength = checkComplete(buffer)) {
        const packageMain = buffer.slice(0, packageLength);
        const {seq, result} = decode(packageMain);
        console.log(`包头为 ${seq + 1} 的包对应的课程为 ${result}`);
        buffer = buffer.slice(packageLength);
    }
    oldBuffer = buffer;
});

function encode(id) {
    const body = Buffer.alloc(bodyMainLength);
    body.writeInt32BE(id);
    const bodyLength = body.length;
    const header = Buffer.alloc(minBodyLength);
    console.log(`包头为 ${seq + 1} 的包对应的 id 为 ${id}`);
    header.writeInt16BE(seq++);
    header.writeInt32BE(bodyLength, 2);
    return Buffer.concat([header, body]);
}

function decode(buffer) {
    const seq = buffer.readInt16BE();
    const body = buffer.slice(minBodyLength);
    const result = body.toString();
    return {
        seq,
        result
    }
}

function checkComplete(buffer) {
    if (buffer.length <= minBodyLength)
        return 0;
    const bodyLength = buffer.readInt32BE(seqLength);
    return bodyLength + minBodyLength;
}

for (let k = 0; k < 100; k++) {
    index = Math.floor(Math.random() * lessonIds.length);
    id = lessonIds[index];
    socket.write(encode(id));
}