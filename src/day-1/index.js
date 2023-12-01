const fs = require('node:fs');
const readline = require('node:readline');
const path = require('node:path');

const DIGIT_CODE_ZERO = 48;
const DIGIT_CODE_NINE = 57;

const NUMBER_WORDS = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}

const isNumberChar = (charCode) => DIGIT_CODE_ZERO <= charCode && charCode <= DIGIT_CODE_NINE;

/**
 * This function only solves part 1 of the problem.
 */
async function part1() {
    const stream = fs.createReadStream(path.join(__dirname, 'input.txt'));
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    let sum = 0;

    // Loop over all the lines in the input file
    for await (const line of rl) {
        if (line.length <= 0) continue;

        let first = null, last = null;

        // Find first digit
        for (let i = 0; i < line.length; i++) {
            const charCode = line.charCodeAt(i);
            if (isNumberChar(charCode)) {
                first = charCode - DIGIT_CODE_ZERO;
                break;
            }
        }

        // Find last digit
        for (let i = line.length - 1; i >= 0; i--) {
            const charCode = line.charCodeAt(i);
            if (isNumberChar(charCode)) {
                last = charCode - DIGIT_CODE_ZERO;
                break;
            }
        }

        if (first !== null && last !== null) {
            const number = first * 10 + last;
            console.log(`Found digits ${first} ${last} -> ${number}`);
            sum += number;
        }
    }

    console.log(`Final sum: ${sum}`);
}

const findNumberWord = (str, i, reversed = false) => {
    const availableLength = reversed ? i + 1 : str.length - i;

    for (const word in NUMBER_WORDS) {
        if (word.length > availableLength) continue;

        const substring = str.substring(reversed ? i - word.length + 1 : i);
        if (substring.startsWith(word)) {
            return NUMBER_WORDS[word];
        }
    }
    return null;
}

/**
 * This solves part 2.
 */
async function main() {
    const stream = fs.createReadStream(path.join(__dirname, 'input.txt'));
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    let sum = 0;

    // Loop over all the lines in the input file
    for await (const line of rl) {
        if (line.length <= 0) continue;

        let first = null, last = null;

        // Find first digit
        for (let i = 0; i < line.length; i++) {
            // Check if it's a single digit character
            const charCode = line.charCodeAt(i);
            if (isNumberChar(charCode)) {
                first = charCode - DIGIT_CODE_ZERO;
                break;
            }

            // Check if it's a number as a word
            const number = findNumberWord(line, i);
            if (number !== null) {
                first = number;
                break;
            }
        }

        // Find last digit
        for (let i = line.length - 1; i >= 0; i--) {
            const charCode = line.charCodeAt(i);
            if (isNumberChar(charCode)) {
                last = charCode - DIGIT_CODE_ZERO;
                break;
            }

            // Check if it's a number as a word
            const number = findNumberWord(line, i, true);
            if (number !== null) {
                last = number;
                break;
            }
        }

        if (first === null || last === null) {
            throw "Could not find two digits!";
        }

        if (first !== null && last !== null) {
            const number = first * 10 + last;
            console.log(`Found digits ${first} ${last} -> ${number}`);
            sum += number;
        }
    }

    console.log(`Final sum: ${sum}`);
}

main();