const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    // for (let i = 0; i < (os.cpus().length / 2); i++) {
    for (let i = 0; i < 1; i++) {
        // 进程守护: 心跳检测僵尸进程
        const worker = cluster.fork();
        let missedPing = 0;
        const heartProcess = setInterval(() => {
            console.log('ping');
            worker.send('ping');
            missedPing++;
            if (missedPing >= 3) {
                clearInterval(heartProcess);
                process.kill(worker.process.pid);
            }
        }, 300);
        worker.on('message', msg => {
            if (msg === 'pong') {
                missedPing--;
            }
        });
    }

    // 进程守护: 宕机重置
    cluster.on('exit', () => {
        const downProcessTimer = setTimeout(() => {
            clearTimeout(downProcessTimer);
            cluster.fork();
        }, 5000);
    });
} else {
    process.on('uncaughtException', error => {
        console.log('error => ', error);
        process.exit(1);
    });
    process.on('message', (msg) => {
        if (msg === 'ping') {
            console.log('pong');
            process.send('pong');
        }
    });
    // 进程守护: 内存监控
    const memoryInterval = setInterval(() => {
        const rss = process.memoryUsage.rss();
        console.log(rss);
        if (rss > 200 * 1024 * 1024) {
            console.log('oom');
            clearInterval(memoryInterval);
            process.exit(1);
        }
    }, 5000);
    require('./index');
}