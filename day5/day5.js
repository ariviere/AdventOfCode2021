const input = require('fs').readFileSync('input.txt', 'utf-8').trim().split('\n');

const addLineToMap = (line, windMap) => {
    let overlapCount = 0
    // if (line[0] === line[2] && line[1] === line[3]) {
    //     windMap[line[1]][line[0]]++
    //     if (windMap[line[1]][line[0]] === 2) overlapCount++
    // } else
    if (line[0] === line[2]) {
        for (let i = line[1]; i <= line[3]; i++) {
            windMap[i][line[0]]++
            if (windMap[i][line[0]] === 2) overlapCount++
        }
    } else if (line[1] === line[3]) {
        for (let i = line[0]; i <= line[2]; i++) {
            windMap[line[1]][i]++
            if (windMap[line[1]][i] === 2) overlapCount++
        }
    } else {
        let i = 0
        while (true) {
            let columnIndex = (line[0] < line[2]) ? line[0] + i : line[0] - i
            let rowIndex = (line[1] < line[3]) ? line[1] + i : line[1] - i
            windMap[rowIndex][columnIndex]++
            if (windMap[rowIndex][columnIndex] === 2) overlapCount++
            if (rowIndex === line[3] || columnIndex === line[2]) {
                break;
            }
            i++
        }
    }

    return overlapCount
}
//part 1
const ventLines = input
    .map(value => value
        .replace(/\s+/g, '')
        .split('->')
        .flatMap(line => line.split(','))
        .map(value => parseInt(value)))
    .reduce((acc, lineValues) => {
        if (lineValues[0] === lineValues[2]) {
            acc.push((lineValues[1] < lineValues[3]) ? lineValues : [lineValues[0], lineValues[3], lineValues[0], lineValues[1]])
        } else if (lineValues[1] === lineValues[3]) {
            acc.push((lineValues[0] < lineValues[2]) ? lineValues : [lineValues[2], lineValues[1], lineValues[0], lineValues[1]])
        } else if (Math.abs(lineValues[0] - lineValues[1]) === Math.abs(lineValues[2] - lineValues[3])
            || Math.abs(lineValues[0] - lineValues[2]) === Math.abs(lineValues[1] - lineValues[3])) {
            acc.push(lineValues)
        }
        return acc
    }, [])

const ventMap = ventLines.reduce((acc, line, index) => {
    const overlapCount = addLineToMap(line, acc.windMap)
    acc.overlapCount += overlapCount
    return acc
}, {windMap: [...Array(1000)].map(x => Array(1000).fill(0)), overlapCount: 0})

console.log(ventMap.overlapCount);