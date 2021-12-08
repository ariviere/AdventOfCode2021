const daysCount = 20
let input = require('fs')
    .readFileSync("input2.txt", 'utf-8')
    .trim()
    .split(',')
    .map(value => { return {fishValue: parseInt(value), daysLeft: daysCount}})

//part1

const countFishs = (fish, daysLeft) => {
}
const reduceInput = (input) =>
    input.reduce((acc, fish) => {
        if (fish.daysLeft === 0) {
            acc.push(fish)
            return acc
        }
        endLoop = false
        let currentDaysCount = fish.daysLeft
        let fishValue = fish.fishValue
        while (currentDaysCount > 0) {
            currentDaysCount--
            if (fishValue === 0) {
                fishValue = 6
                acc.push({fishValue: 8, daysLeft: currentDaysCount})
            } else {
                fishValue--
            }
        }
        acc.push({fishValue: fishValue, daysLeft: 0})
        return acc
    }, [])

let endLoop = false

while (!endLoop) {
    endLoop = true
    input = reduceInput(input)
}

console.log('part1')
console.log(input.length)