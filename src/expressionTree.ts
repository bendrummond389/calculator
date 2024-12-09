class TreeNode {
    value: string
    left: TreeNode | null
    right: TreeNode | null

    constructor(value: string) {
        this.value = value
        this.left = null
        this.right = null
    }
}

const tokenize = (expression: string): string[] => {
    return expression.match(/\d+|\+|\-|\*|\/|\(|\)/g) || []
}
