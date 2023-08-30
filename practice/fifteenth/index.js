const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');

const demoProto = fs.readFileSync(path.resolve(__dirname, './demo.proto'), 'utf-8');

const buffer = Buffer.from('hello GeekBang');
const bufferAno = Buffer.from([1, 2, 3, 4]);
const bufferThird = Buffer.alloc(4);

console.log(buffer, bufferAno, bufferThird);

bufferAno.writeInt8(12, 1);
console.log(bufferAno);
bufferAno.writeInt16BE(512, 2);
console.log(bufferAno);
bufferAno.writeInt16LE(512, 2);
console.log(bufferAno);

const schema = protobuf(demoProto);
const buffers = schema.Column.encode({
    id: 1,
    name: '01 | 课程介绍',
    price: 80.5
});
console.log(buffers);
const lesson = schema.Column.decode(buffers);
console.log(lesson);