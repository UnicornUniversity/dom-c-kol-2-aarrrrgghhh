//TODO add imports if needed
//import { exMain } from "./exclude/exampleAss2.js"
//TODO add/change doc as needed

/**
 * Converts a number from one numeral system to another.
 * This function does NOT use JavaScript's built-in parseInt or toString for the full number.
 * It only uses custom logic and helper functions that process digits individually.
 *
 * @param {string} inputNumber - number that is being converted
 * @param {number} inputNumberSystem - numerical system that the inputNumber is being converted from
 * @param {number} outputNumberSystem - numerical system that the inputNumber is being converted into
 * @returns {string} containing number converted to output system
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {
    // Step 1: Input validation
    if (!inputNumber || inputNumber.length === 0) throw new Error("Invalid input number");
    if (inputNumberSystem === outputNumberSystem) throw new Error("Conversion to the same base is not allowed");

    // Step 2: Convert inputNumber to decimal (if necessary)
    let decimalNumber = 0;
    if (inputNumberSystem !== 10) {
        for (let i = 0; i < inputNumber.length; i++) {
            const digitValue = convertCharToNumber(inputNumber[i]);
            if (digitValue >= inputNumberSystem) throw new Error("Invalid digits for source base");
            decimalNumber = decimalNumber * inputNumberSystem + digitValue;
        }
    } else {
        // input is decimal
        for (let i = 0; i < inputNumber.length; i++) {
            const digitValue = convertCharToNumber(inputNumber[i]);
            decimalNumber = decimalNumber * 10 + digitValue;
        }
    }

    // Step 3: Handle zero case
    if (decimalNumber === 0) return "0";

    // Step 4: Convert decimal number to target system
    let resultNumber = "";
    if (outputNumberSystem === 10) {
        resultNumber = decimalNumber.toString(); // safe for decimal output
    } else {
        while (decimalNumber > 0) {
            const remainder = decimalNumber % outputNumberSystem;
            const remainderChar = convertNumberToChar(remainder);
            resultNumber = remainderChar + resultNumber;
            decimalNumber = Math.floor(decimalNumber / outputNumberSystem); // integer division
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
 * Helper: Converts a single character to its numeric value
 * Only works for one character at a time. Similar to parseInt for a single digit.
 */
function convertCharToNumber(char) {
    const code = char.charCodeAt(0);
    if (code >= 48 && code <= 57) return code - 48;          // '0'-'9'
    if (code >= 65 && code <= 90) return code - 65 + 10;     // 'A'-'Z'
    if (code >= 97 && code <= 122) return code - 97 + 10;    // 'a'-'z'
    throw new Error("Invalid character in number");
}

/**
 * Helper: Converts numeric value (0..31) to character representation
 */
function convertNumberToChar(num) {
    if (num >= 0 && num <= 9) return String.fromCharCode(48 + num); // '0'-'9'
    if (num >= 10 && num <= 31) return String.fromCharCode(65 + num - 10); // 'A'-'V' for 32-base
    throw new Error("Number too large for conversion");
}
