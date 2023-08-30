module.exports = function game(playerAction) {
    const computerRandom = Math.random() * 3;
    let computerAction;
    if (computerRandom < 1) {
        computerAction = 'rock';
    } else if (computerRandom < 2) {
        computerAction = 'scissors';
    } else {
        computerAction = 'paper';
    }
    if (computerAction === playerAction) {
        return 0;
    } else if ((computerAction === 'rock' && playerAction === 'paper') || (computerAction === 'paper' && playerAction === 'scissors') || (computerAction === 'scissors' && playerAction === 'rock')) {
        return 1;
    } else {
        return -1;
    }
};