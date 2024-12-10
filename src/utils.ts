import { Operator, OPERATORS } from './types'

/**
 * Checks if a given token is a valid mathematical operator.
 *
 * @param token - The token to check.
 * @returns `true` if the token is an `Operator`, otherwise `false`.
 */
export const isOperator = (token: string): token is Operator => {
    return OPERATORS.has(token as Operator)
}

/**
 * Checks if a given token represents a valid number.
 *
 * @param token - The token to check.
 * @returns `true` if the token is a number, otherwise `false`.
 */
export const isNumber = (token: string): boolean => {
    return !isNaN(parseFloat(token)) && isFinite(parseFloat(token))
}
