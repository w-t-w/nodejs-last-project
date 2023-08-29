const game = require('./lib');

let playerCount = 0;

console.log('石头、剪刀、布游戏!');
console.log('请输入您的选择:');
process.stdin.on('data', result => {
    const playerAction = result.toString().trim();
    const gameResult = game(playerAction);
    console.log(gameResult);
    if (gameResult === 1) {
        playerCount++;
    }
    if (playerCount === 3) {
        console.log('你太厉害了!我不跟你玩儿了!');
        process.exit(0);
    } else {
        console.log('请输入您的选择:');
    }
});