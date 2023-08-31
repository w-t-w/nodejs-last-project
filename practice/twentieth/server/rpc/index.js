const RPC = require('../lib/server');

module.exports = (encodeSchema, decodeSchema) => {
    const minPackageHeadLength = 8,
        seqLength = 4;

    return new RPC({
        encode(data, seq) {
            const body = encodeSchema.encode(data);
            const bodyLength = body.length;
            const header = Buffer.alloc(minPackageHeadLength);
            header.writeInt32BE(seq);
            header.writeInt32BE(bodyLength, seqLength);
            return Buffer.concat([header, body]);
        },
        decode(buffer) {
            const seq = buffer.readInt32BE();
            const result = decodeSchema.decode(buffer.slice(minPackageHeadLength));
            return {
                seq,
                result
            };
        },
        isReceivedComplete(buffer) {
            if (buffer.length <= minPackageHeadLength)
                return 0;
            const bodyLength = buffer.readInt32BE(seqLength);
            if (buffer.length >= bodyLength + minPackageHeadLength)
                return bodyLength + minPackageHeadLength;
            else
                return 0;
        }
    });
};