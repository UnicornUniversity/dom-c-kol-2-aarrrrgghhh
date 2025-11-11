//TODO add imports if needed
// This implementation follows the algorithm created for the homework assignment
// No use of .toString(base) or parseInt(number, base) for the whole number

/**
 * Converts a number from one numeral system to another
 * @param {string} inputNumber - number as string in source system
 * @param {number} inputNumberSystem - base of input number
 * @param {number} outputNumberSystem - base to convert to
 * @returns {string} - converted number in output system
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {
  // Step 1: Validate input digits
  for (let i = 0; i < inputNumber.length; i++) {
    const digitValue = charToNumber(inputNumber[i]);
    if (digitValue >= inputNumberSystem) {
      throw new Error("Invalid digits for source base");
    }
  }

  // Step 2: Check that source and target bases are not the same
  if (inputNumberSystem === outputNumberSystem) {
    throw new Error("Conversion to the same base is not allowed");
  }

  // Step 3: Convert input number to decimal (only if needed)
  let decimalNumber;
  if (inputNumberSystem !== 10) {
    decimalNumber = convertToDecimal(inputNumber, inputNumberSystem);
  } else {
    decimalNumber = Number(inputNumber); // input is decimal
  }

  // Step 4: Handle zero case
  if (decimalNumber === 0) {
    return "0";
  }

  // Step 5: Convert decimal number to target base
  let resultNumber = "";
  if (outputNumberSystem !== 10) {
    while (decimalNumber > 0) {
      const remainder = decimalNumber % outputNumberSystem;
      const remainderChar = numberToChar(remainder);
      resultNumber = remainderChar + resultNumber;
      decimalNumber = Math.floor(decimalNumber / outputNumberSystem);
    }
  } else {
    resultNumber = decimalNumber.toString(); // decimal output
  }

  return resultNumber;
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

/* ---------------- Helper Functions ---------------- */

/**
 * Converts a single character to its numeric value.
 * Works for '0'-'9' and 'A'-'V' for bases up to 32.
 * @param {string} char
 * @returns {number}
 */
function charToNumber(char) {
  const upperChar = char.toUpperCase();
  if (upperChar >= "0" && upperChar <= "9") {
    return upperChar.charCodeAt(0) - "0".charCodeAt(0);
  } else if (upperChar >= "A" && upperChar <= "V") { // A=10, B=11, ..., V=31
    return upperChar.charCodeAt(0) - "A".charCodeAt(0) + 10;
  } else {
    throw new Error("Invalid character: " + char);
  }
}

/**
 * Converts a number to its character representation.
 * @param {number} num
 * @returns {string}
 */
function numberToChar(num) {
  if (num >= 0 && num <= 9) {
    return String.fromCharCode("0".charCodeAt(0) + num);
  } else if (num >= 10 && num <= 31) {
    return String.fromCharCode("A".charCodeAt(0) + num - 10);
  } else {
    throw new Error("Invalid number for conversion to character: " + num);
  }
}

/**
 * Converts a number string from source base to decimal
 * @param {string} numberStr
 * @param {number} sourceBase
 * @returns {number}
 */
function convertToDecimal(numberStr, sourceBase) {
  let decimalValue = 0;
  for (let i = 0; i < numberStr.length; i++) {
    const digitValue = charToNumber(numberStr[i]);
    decimalValue = decimalValue * sourceBase + digitValue;
  }
  return decimalValue;
}
