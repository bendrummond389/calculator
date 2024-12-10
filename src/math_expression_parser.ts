/**
 * Represents the allowed mathematical operators.
 */
type Operator = '+' | '-' | '*' | '/' | '^'

/**
 * A mapping of operators to their precedence levels.
 *
 * The precedence levels are based on standard mathematical conventions:
 * - '+' and '-' have the lowest precedence (level 1).
 * - '*' and '/' have a higher precedence (level 2).
 * - '^' (exponentiation) has the highest precedence (level 3).
 *
 * This means that in an expression, operators with higher precedence
 * will be evaluated before operators with lower precedence. For example,
 * in the expression "3 + 5 * 2", the multiplication will be performed
 * before the addition, resulting in "3 + (5 * 2)".
 */
const precedence: Record<Operator, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
}

/**
 * Checks if a given token is a valid mathematical operator.
 *
 * @param token - The token to check.
 * @returns `true` if the token is an `Operator`, otherwise `false`.
 */
const isOperator = (token: string): token is Operator => {
    return ['+', '-', '*', '/', '^'].includes(token)
}

/**
 * Checks if a given token represents a valid number.
 *
 * @param token - The token to check.
 * @returns `true` if the token is a number, otherwise `false`.
 */
const isNumber = (token: string): boolean => {
    return !isNaN(parseFloat(token))
}

/**
 * Converts an array of tokens from infix notation to Reverse Polish Notation (RPN)
 * using the Shunting Yard algorithm.
 *
 * @param tokens - An array of tokens in infix notation.
 * @returns An array of tokens in RPN.
 */
const shuntingYard = (tokens: string[]): string[] => {
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
            operators.pop()
        }
    }

    while (operators.length > 0) {
        output.push(operators.pop()!)
    }

    return output
}

/**
 * Evaluates a mathematical expression represented in Reverse Polish Notation (RPN).
 *
 * @param tokens - An array of tokens in RPN.
 * @returns The numerical result of evaluating the RPN expression.
 *
 * @throws Will throw an error if the RPN expression is invalid or if the stack is left in an unexpected state.
 */
const evaluateRPN = (tokens: string[]): number => {
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
        }
    }

    if (stack.length !== 1) {
        throw new Error('Invalid RPN expression: unexpected state.')
    }

    return stack[0]
}

/**
 * Tokenizes a mathematical expression string into an array of tokens.
 *
 * @param expression - The mathematical expression as a string.
 * @returns An array of tokens extracted from the expression.
 */
const tokenize = (expression: string): string[] => {
    const regex = /-?\d+(\.\d+)?|[+\-*/^()]|\s+/g
    return expression.match(regex)?.filter((token) => token.trim() !== '') || []
}

const main = (): void => {
    const expression = '-3 + 5 * (2 - 8)'
    console.log('Expression:', expression)

    const tokens = tokenize(expression)
    console.log('Tokens:', tokens)

    const refactor = shuntingYard(tokens)
    console.log('RPN:', refactor)

    const output = evaluateRPN(refactor)
    console.log('Output:', output)
}

main()
