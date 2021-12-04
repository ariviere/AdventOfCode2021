const input = require('fs').readFileSync('input.txt', 'utf-8').trim().split('\n');

//part 1
const getColumnSum = (input, columnIndex) => input.reduce((acc, value) => (value[columnIndex] === '0') ? acc - 1 : acc + 1, 0)

const getRate = (input, reverse = false) =>
    parseInt(input[0].split('').reduce((acc, value, columnIndex) => {
        const columnSum = getColumnSum(input, columnIndex)
        return (reverse ^ columnSum > 0) ? acc + '1' : acc + '0'
    }, ''), 2)

console.log('part1')
console.log(getRate(input, false) * getRate(input, true))


//part 2
const filterForLifeSupportRating = (input, reverse) =>
    parseInt(input[0].split('').reduce((acc, value, columnIndex) => {
        if (acc.length === 1) return acc
        const columnSum = getColumnSum(acc, columnIndex)
        return acc.filter(entry => (reverse ^ columnSum >= 0) ? entry[columnIndex] === '1' : entry[columnIndex] === '0')
    }, input)[0], 2)

console.log('part2')
console.log(filterForLifeSupportRating(input, false) * filterForLifeSupportRating(input, true))