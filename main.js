//TODO add imports if needed
//import { exMain } from "./exclude/exampleAss2.js"

/**
 * TODO - Write functional code for this application. You can call any other function, but usage of ".toString(numberSystem)" and "Number.parseInt(number, numberSystem)" is forbidden (only permitted when used on individual digits).
 * The main function which calls the application. 
 * TODO - Please, add specific description here for the application purpose.
 * @param {string} inputNumber number that is being converted
 * @param {number} inputNumberSystem numerical system that the inputNumber is being converted from
 * @param {number} outputNumberSystem numerical system that the inputNumber is being converted into
 * @returns {string} containing number converted to output system
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {
  let decimalNumber = convertToDecimal(inputNumber, inputNumberSystem);
  let resultNumber = '';
  if(decimalNumber === 0) {
    resultNumber = '0';
  } else {
    while(decimalNumber > 0) {
      let remainder = decimalNumber % outputNumberSystem;
      let remainderChar = convertNumberToChar(remainder);
      resultNumber = remainderChar + resultNumber;
      decimalNumber = Math.floor(decimalNumber / outputNumberSystem);
    }
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

/**
 * Converts a single character to its numeric value.
 */
function convertCharToNumber(char) {
  if(char >= '0' && char <= '9') return char.charCodeAt(0) - 48;
  if(char >= 'A' && char <= 'Z') return char.charCodeAt(0) - 65 + 10;
  if(char >= 'a' && char <= 'z') return char.charCodeAt(0) - 97 + 10;
  throw new Error('Invalid character for conversion');
}

/**
 * Converts a number to its corresponding character representation.
 */
function convertNumberToChar(num) {
  if(num >= 0 && num <= 9) return String.fromCharCode(48 + num);
  if(num >= 10 && num <= 35) return String.fromCharCode(65 + num - 10);
  throw new Error('Number too large for single-digit representation');
}

/**
 * Converts an input number from a given base to decimal.
 */
function convertToDecimal(inputNumber, sourceBase) {
  let decimalNumber = 0;
  for(let i = 0; i < inputNumber.length; i++) {
    let digitValue = convertCharToNumber(inputNumber[i]);
    if(digitValue >= sourceBase) throw new Error('Invalid digit for source base');
    decimalNumber = decimalNumber * sourceBase + digitValue;
  }
  return decimalNumber;
}
