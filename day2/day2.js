const fs = require('fs');

// Read in the input text, then split it by return character
let input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

//part 1
const part1 = input.reduce((acc, value) => {
    const command = value.split(" ")
    const amount = parseInt(command[1])
    switch (command[0]) {
        case "forward": return [acc[0] + amount, acc[1]]
        case "down": return [acc[0], acc[1] + amount]
        case "up": return [acc[0], acc[1] - amount]
        default: return acc
    }
}, [0, 0])

const part2 = input.reduce((acc, value, index) => {
    const command = value.split(" ")
    const amount = parseInt(command[1])
    switch (command[0]) {
        case "forward": return [acc[0] + amount, acc[1] + (amount * acc[2]), acc[2]]
        case "down": return [acc[0], acc[1], acc[2] + amount]
        case "up": return [acc[0], acc[1], acc[2] - amount]
        default: return acc
    }
}, [0, 0, 0])

console.log('part1')
console.log(part1[0] * part1[1])

console.log('part2')
console.log(part2[0] * part2[1])