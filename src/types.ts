/**
 * Represents the allowed mathematical operators.
 */
export type Operator = '+' | '-' | '*' | '/' | '^'

/**
 * A set of valid mathematical operators.
 *
 * This set includes the basic arithmetic operators ('+', '-', '*', '/')
 * as well as the exponentiation operator ('^').
 *
 * It is used to efficiently verify whether a given token is a valid operator
 * in mathematical expressions.
 */
export const OPERATORS = new Set<Operator>(['+', '-', '*', '/', '^'])

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
export const precedence: Record<Operator, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
}
