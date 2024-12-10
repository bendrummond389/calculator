/**
 * Tokenizes a mathematical expression string into an array of tokens.
 *
 * @param expression - The mathematical expression as a string.
 * @returns An array of tokens extracted from the expression.
 */
export const tokenize = (expression: string): string[] => {
    const regex = /-?\d+(\.\d+)?|[+\-*/^()]|\s+/g
    return expression.match(regex)?.filter((token) => token.trim() !== '') || []
}
