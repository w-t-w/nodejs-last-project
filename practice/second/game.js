const argv = process.argv;
const playerAction = argv[argv.length - 1];
const computerRandom = Math.random() * 3;
let computerAction;
if (computerRandom < 1) {
    computerAction = 'rock';
} else if (computerRandom < 2) {
    computerAction = 'scissors';
} else {
    computerAction = 'paper';
}
console.log('电脑: ', computerAction);
if (computerAction === playerAction) {
    console.log('平局!');
} else if((computerAction === 'rock' && playerAction === 'paper') || (computerAction === 'paper' && playerAction === 'scissors') || (computerAction === 'scissors' && playerAction === 'rock')) {
    console.log('你赢了!');
} else {
    console.log('你输了!');
}