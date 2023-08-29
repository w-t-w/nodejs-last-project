module.exports = function game(playerAction) {
    const computerRandom = Math.random() * 3;
    let computerAction;
    if (computerRandom < 1) {
        computerAction = 'rock'
    } else if (computerRandom < 2) {
        computerAction = 'scissors'
    } else {
        computerAction = 'paper';
    }
    console.log('电脑: ', computerAction);
    if (playerAction === computerAction) {
        console.log('平局!');
        return 0;
    } else if ((playerAction === 'paper' && computerAction === 'rock') || (playerAction === 'scissors' && computerAction === 'paper') || (playerAction === 'rock' && computerAction === 'scissors')) {
        console.log('你赢了!');
        return 1;
    } else {
        console.log('你输了!');
        return -1;
    }
};