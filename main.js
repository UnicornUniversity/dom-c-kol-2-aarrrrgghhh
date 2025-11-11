//TODO add imports if needed
//import { exMain } from "./exclude/exampleAss2.js"

//TODO add/change doc as needed

/**
 * Converts the given number from input base to output base.
 * Does NOT use toString(base) or parseInt(number, base) for whole numbers.
 * Uses custom helper functions for digit conversion.
 *
 * @param {string} inputNumber - number that is being converted (string)
 * @param {number} inputNumberSystem - base of input number (2, 10, 32)
 * @param {number} outputNumberSystem - target base (2, 10, 32)
 * @returns {string} converted number in output base
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {

  validateBases(inputNumberSystem, outputNumberSystem);
  validateDigits(inputNumber, inputNumberSystem);

  // Step 1 → convert FROM input base → TO decimal
  const decimalValue = convertToDecimal(inputNumber, inputNumberSystem);

  // Step 2 → convert FROM decimal → TO output base
  const result = convertFromDecimal(decimalValue, outputNumberSystem);

  return result;
}

/**
 * Defines which bases are permitted as input.
 * @returns {Array<number>}
 */
export function permittedInputSystems() {
  return [2, 10, 32];
}

/**
 * Defines which bases are permitted as output.
 * @returns {Array<number>}
 */
export function permittedOutputSystems() {
  return [2, 10, 32];
}

/* ──────────────────────────────────────────────── */
/*                    CORE LOGIC                    */
/* ──────────────────────────────────────────────── */

/**
 * Converts any number (string) in base N → decimal (number)
 * WITHOUT using parseInt(fullNumber, base)
 */
function convertToDecimal(str, base) {
  let result = 0;

  for (let i = 0; i < str.length; i++) {
    const digitValue = charToValue(str[i]); // our own helper
    result = result * base + digitValue;
  }

  return result;
}

/**
 * Converts a decimal number → string in target base
 * WITHOUT using number.toString(base)
 */
function convertFromDecimal(number, base) {
  if (number === 0) return "0";

  let output = "";

  while (number > 0) {
    const remainder = number % base;
    output = valueToChar(remainder) + output; // our helper converts digit→char
    number = Math.floor(number / base);
  }

  return output;
}

/* ──────────────────────────────────────────────── */
/*                VALIDATION HELPERS                */
/* ──────────────────────────────────────────────── */

function validateBases(inputBase, outputBase) {
  if (!permittedInputSystems().includes(inputBase)) {
    throw new Error("Input base not permitted.");
  }
  if (!permittedOutputSystems().includes(outputBase)) {
    throw new Error("Output base not permitted.");
  }
}

function validateDigits(str, base) {
  for (let ch of str) {
    const value = charToValue(ch);
    if (value >= base) {
      throw new Error("Invalid digit for given input base.");
    }
  }
}

/* ──────────────────────────────────────────────── */
/*              DIGIT CONVERSION HELPERS            */
/*  These are simple helpers for single characters  */
/*  They DO NOT replace parseInt() for whole input  */
/*  They only work on ONE DIGIT as allowed in task  */
/* ──────────────────────────────────────────────── */

/**
 * Converts a single character into its numeric value.
 * This is similar to parseInt(char, base) ONLY for individual digits,
 * but it does NOT convert whole numbers.
 */
function charToValue(char) {
  // 0–9
  if (char >= "0" && char <= "9") {
    return char.charCodeAt(0) - "0".charCodeAt(0);
  }

  // A–Z → values 10–35 (needed for base 32)
  if (char >= "A" && char <= "Z") {
    return char.charCodeAt(0) - "A".charCodeAt(0) + 10;
  }

  throw new Error("Invalid character.");
}

/**
 * Converts a numeric value (0–35) back into a single character digit.
 * Reverse of charToValue().
 */
function valueToChar(value) {
  if (value < 10) {
    return String.fromCharCode("0".charCodeAt(0) + value);
  }

  return String.fromCharCode("A".charCodeAt(0) + (value - 10));
}
