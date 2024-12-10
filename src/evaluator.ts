import { Operator, OPERATORS, precedence } from './types'
import { isNumber, isOperator } from './utils'

/**
 * Evaluates a mathematical expression represented in Reverse Polish Notation (RPN).
 *
 * @param tokens - An array of tokens in RPN.
 * @returns The numerical result of evaluating the RPN expression.
 *
 * @throws Will throw an error if the RPN expression is invalid or if the stack is left in an unexpected state.
 */
export const evaluateRPN = (tokens: string[]): number => {
    const stack: number[] = []

    for (const token of tokens) {
        if (isNumber(token)) {
            stack.push(parseFloat(token))
        } else if (isOperator(token)) {
            if (stack.length < 2) {
                throw new Error('Invalid RPN expression: not enough operands.')
            }
            const b = stack.pop()!
            const a = stack.pop()!
            switch (token) {
                case '+':
                    stack.push(a + b)
                    break
                case '-':
                    stack.push(a - b)
                    break
                case '*':
                    stack.push(a * b)
                    break
                case '/':
                    if (b === 0) throw new Error('Division by zero.')
                    stack.push(a / b)
                    break
                case '^':
                    stack.push(a ** b)
                    break
            }
        } else {
            throw new Error(`Invalid token in RPN: ${token}`)
        }
    }

    if (stack.length !== 1) {
        throw new Error('Invalid RPN expression: unexpected stack state.')
    }

    return stack[0]
}
