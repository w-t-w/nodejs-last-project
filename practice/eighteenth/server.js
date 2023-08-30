const net = require('net');

const PORT = 4000;

const minBodyLength = 6;
const seqLength = 2;
let oldBuffer = null;

const data = {
    136797: "01 | 课程介绍",
    136798: "02 | 内容综述",
    136799: "03 | Node.js是什么？",
    136800: "04 | Node.js可以用来做什么？",
    136801: "05 | 课程实战项目介绍",
    136803: "06 | 什么是技术预研？",
    136804: "07 | Node.js开发环境安装",
    136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
    136807: "09 | 模块：CommonJS规范",
    136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
    136809: "11 | 模块：npm",
    141994: "12 | 模块：Node.js内置模块",
    143517: "13 | 异步：非阻塞I/O",
    143557: "14 | 异步：异步编程之callback",
    143564: "15 | 异步：事件循环",
    143644: "16 | 异步：异步编程之Promise",
    146470: "17 | 异步：异步编程之async/await",
    146569: "18 | HTTP：什么是HTTP服务器？",
    146582: "19 | HTTP：简单实现一个HTTP服务器"
};

const socket = net.createServer(socket => {
    let packageLength = null;
    socket.on('data', buffer => {
        if (oldBuffer) {
            buffer = Buffer.concat([oldBuffer, buffer]);
        }
        while (packageLength = checkComplete(buffer)) {
            let packageMain = buffer.slice(0, packageLength);
            const {seq, result} = decode(packageMain);
            socket.write(encode(seq, result));
            buffer = buffer.slice(packageLength);
        }
        oldBuffer = buffer;
    });
});

function encode(seq, result) {
    const body = Buffer.from(data[result]);
    const bodyLength = body.length;
    const header = Buffer.alloc(minBodyLength);
    header.writeInt16BE(seq);
    header.writeInt32BE(bodyLength, seqLength);
    return Buffer.concat([header, body]);
}

function decode(buffer) {
    const seq = buffer.readInt16BE();
    const body = buffer.slice(minBodyLength);
    const result = body.readInt32BE();
    return {
        seq,
        result
    };
}

function checkComplete(buffer) {
    if (buffer.length <= minBodyLength)
        return 0;
    const bodyLength = buffer.readInt32BE(seqLength);
    return bodyLength + minBodyLength;
}

socket.listen(PORT);