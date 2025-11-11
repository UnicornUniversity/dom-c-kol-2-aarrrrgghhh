//TODO add imports if needed
//import { exMain } from "./exclude/exampleAss2.js"
//TODO add/change doc as needed

/**
 * Converts a number from one numeral system to another.
 * This implementation follows the algorithm from Assignment #1.
 * It manually checks digits, converts input → decimal, and decimal → target base.
 * No built-in base conversion (parseInt(num, base) or num.toString(base)) is used.
 *
 * @param {string} inputNumber - number being converted (as string)
 * @param {number} inputNumberSystem - source numeral system
 * @param {number} outputNumberSystem - target numeral system
 * @returns {string} number converted to the target system
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {

    // STEP 1 — Validate input numeral systems
    if (!permittedInputSystems().includes(inputNumberSystem)) {
        throw new Error("Error 201: source base not permitted.");
    }

    if (!permittedOutputSystems().includes(outputNumberSystem)) {
        throw new Error("Error 202: target base not permitted.");
    }

    // STEP 2 — Check that bases are not equal
    if (inputNumberSystem === outputNumberSystem) {
        throw new Error("Error 102: conversion to the same base is not allowed.");
    }

    // STEP 3 — Validate digits in the input number
    for (let i = 0; i < inputNumber.length; i++) {
        if (charToValue(inputNumber[i]) >= inputNumberSystem) {
            throw new Error("Error 101: invalid digit for source base.");
        }
    }

    // STEP 4 — Convert input number to decimal (only if needed)
    let decimalValue = 0;

    if (inputNumberSystem !== 10 || outputNumberSystem !== 10) {
        for (let i = 0; i < inputNumber.length; i++) {
            const digitValue = charToValue(inputNumber[i]);
            decimalValue = decimalValue * inputNumberSystem + digitValue;
        }
    } else {
        // If both bases are 10 → simple case
        decimalValue = Number(inputNumber);
    }

    // STEP 5 — Handle zero case
    if (decimalValue === 0) {
        return "0";
    }

    // STEP 6 — Convert from decimal to target base
    let result = "";

    while (decimalValue > 0) {
        const remainder = decimalValue % outputNumberSystem;
        result = valueToChar(remainder) + result;
        decimalValue = Math.floor(decimalValue / outputNumberSystem);
    }

    return result;
}

/**
 * Permitted input numeral systems.
 */
export function permittedInputSystems() {
    return [2,3,4,5,6,7,8,9,10,11,12,16,32];
}

/**
 * Permitted output numeral systems.
 */
export function permittedOutputSystems() {
    return [2,3,4,5,6,7,8,9,10,11,12,16,32];
}

/* ============================================================
   HELPER FUNCTIONS — used internally, NOT built-in conversion
   These functions operate only on single characters or values,
   which is allowed by the assignment.
   ============================================================ */

/**
 * Converts a single character to its numeric value.
 * Similar to using parseInt(char) only for one digit,
 * but this version never converts whole numbers.
 */
function charToValue(ch) {
    if (ch >= '0' && ch <= '9') return ch.charCodeAt(0) - 48;
    if (ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 55; // A=10 → Z=35
    if (ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 87; // a=10 → z=35
    return 999; // forces "invalid digit" error
}

/**
 * Converts a numeric value to its character representation.
 */
function valueToChar(value) {
    if (value >= 0 && value <= 9) return String.fromCharCode(48 + value);
    return String.fromCharCode(55 + value); // 10→A ... 35→Z
}
