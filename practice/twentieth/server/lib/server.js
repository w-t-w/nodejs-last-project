const net = require('net');

class RPC {
    constructor({encode, decode, isReceivedComplete}) {
        this.encode = encode;
        this.decode = decode;
        this.isReceivedComplete = isReceivedComplete;
    }

    createServer(callback) {
        const tcpServer = net.createServer(socket => {
            let buffer = null,
                packageLength = null;
            socket.on('data', data => {
                buffer = buffer && buffer.length > 0 ? Buffer.concat([buffer, data]) : data;
                while (buffer && (packageLength = this.isReceivedComplete(buffer))) {
                    let packageMain = null;
                    if (packageLength === buffer.length) {
                        packageMain = buffer;
                        buffer = null;
                    } else {
                        packageMain = buffer.slice(0, packageLength);
                        buffer = buffer.slice(packageLength);
                    }
                    const {seq, result} = this.decode(packageMain);
                    callback({
                        body: result,
                        socket
                    }, {
                        end: (data) => {
                            const buffer = this.encode(data, seq);
                            socket.write(buffer);
                        }
                    });
                }
            });
        });

        return {
            listen(...args) {
                tcpServer.listen.apply(tcpServer, args);
            }
        }
    }
}

module.exports = RPC;