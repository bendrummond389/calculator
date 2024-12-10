import { Operator, OPERATORS, precedence } from './types'
import { isNumber, isOperator } from './utils'

/**
 * Converts an array of tokens from infix notation to Reverse Polish Notation (RPN)
 * using the Shunting Yard algorithm.
 *
 * @param tokens - An array of tokens in infix notation.
 * @returns An array of tokens in RPN.
 */
export const shuntingYard = (tokens: string[]): string[] => {
    const output: string[] = []
    const operators: string[] = []

    for (const token of tokens) {
        if (isNumber(token)) {
            output.push(token)
        } else if (isOperator(token)) {
            while (
                operators.length > 0 &&
                isOperator(operators[operators.length - 1]) &&
                precedence[operators[operators.length - 1] as Operator] >=
                    precedence[token as Operator]
            ) {
                output.push(operators.pop()!)
            }
            operators.push(token)
        } else if (token === '(') {
            operators.push(token)
        } else if (token === ')') {
            while (
                operators.length > 0 &&
                operators[operators.length - 1] !== '('
            ) {
                output.push(operators.pop()!)
            }
            if (operators.length === 0) {
                throw new Error('Mismatched parentheses.')
            }
            operators.pop()
        } else {
            throw new Error(`Invalid token: ${token}`)
        }
    }

    while (operators.length > 0) {
        const op = operators.pop()!
        if (op === '(' || op === ')') {
            throw new Error('Mismatched parentheses.')
        }
        output.push(op)
    }

    return output
}
