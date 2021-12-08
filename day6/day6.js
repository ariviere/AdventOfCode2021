let input = require('fs')
    .readFileSync("input.txt", 'utf-8')
    .trim()
    .split(',')
    .reduce((acc, value) => {
        const intValue = parseInt(value)
        if (!acc[intValue]) acc[intValue] = 0
        acc[parseInt(value)]++
        return acc
    }, {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0})

const amountOfFish = (fishs, days) => {
    for (let day = 0 ; day < days ; day++) {
        const newBorns = fishs[0]
        for (let i = 0 ; i <= 7 ; i++) {
            fishs[i] = fishs[i + 1]
        }
        fishs[6] += newBorns
        fishs[8] = newBorns
    }
    return Object.values(fishs).reduce((acc, fish) => acc + fish, 0)
}


console.log(amountOfFish(input, 80))
console.log(amountOfFish(input, 256))