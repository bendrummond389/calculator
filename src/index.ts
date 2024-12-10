import { tokenize } from './tokenizer'
import { shuntingYard } from './parser'
import { evaluateRPN } from './evaluator'

const main = (): void => {
    try {
        const expression = '-3 + 5 * (2 - 8)'
        console.log('Expression:', expression)

        const tokens = tokenize(expression)
        console.log('Tokens:', tokens)

        const refactor = shuntingYard(tokens)
        console.log('RPN:', refactor)

        const output = evaluateRPN(refactor)
        console.log('Output:', output)
    } catch (error) {
        if (error instanceof Error) {
            console.error('An error occurred:', error.message)
        } else {
            console.error('An unknown error occurred:', error)
        }
    }
}

main()
