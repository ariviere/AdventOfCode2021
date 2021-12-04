const input = require('fs').readFileSync('input.txt', 'utf-8').trim().split('\n\n');
const BreakException = {};

const buildBoard = (input) =>
    input.split('\n').reduce((acc, line, lineIndex) => {
        line.split(' ').filter(value => value !== '').map((cell, cellIndex) => {
            if (cellIndex === 0) acc[lineIndex] = Array(5)
            acc[lineIndex][cellIndex] = parseInt(cell)
        })
        return acc
    }, [Array(5)])

const checkBingo = (board, lineIndex, cellIndex) => {
    let rowBingo = true
    let columnBingo = true
    for (let i = 0; i < 5; i++) {
        if (board[lineIndex][i] < 100) {
            rowBingo = false
        }
        if (board[i][cellIndex] < 100) {
            columnBingo = false
        }
    }
    return rowBingo || columnBingo
}

const calculateScore = (board, currentValue) => {
    let score = 0
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (board[i][j] < 100) {
                score += board[i][j]
            }
        }
    }
    return score * currentValue;
}

const game = input.reduce((acc, value, index) => {
    if (index === 0) {
        acc.numbers = value.split(',')
    } else {
        acc.boards.push(buildBoard(value))
    }
    return acc
}, {boards: [], bingoBoards: {}})

game.numbers.forEach(data => {
    const number = parseInt(data)
    const gameBoard = game.boards
    gameBoard.forEach((board, boardIndex) => {
        if (game.bingoBoards[boardIndex] === true) {
            return
        }
        let isBingo = false
        let lineIndex = 0
        while (lineIndex < 5 && !isBingo) {
            const boardLine = board[lineIndex]
            let cellIndex = 0
            while (cellIndex < 5 && !isBingo) {
                const boardCell = board[lineIndex][cellIndex]
                if (boardCell === number) {
                    board[lineIndex][cellIndex] += 100
                    const isBingo = checkBingo(board, lineIndex, cellIndex)
                    if (isBingo) {
                        game.bingoBoards[boardIndex] = true
                        if (Object.keys(game.bingoBoards).length === game.boards.length) {
                            console.log('bingo!')
                            console.log(calculateScore(board, number))
                        }
                    }
                }
                cellIndex++
            }
            lineIndex++;
        }
    })
})