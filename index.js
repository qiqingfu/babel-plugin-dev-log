const DEFAULT_IDENTIFIER = "__DEBUG__"

module.exports = function devLog ({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        const parentNodeIsIfStatement = t.isIfStatement(path.parent)
        const isIdentifier = path.node.name === DEFAULT_IDENTIFIER
        
        if (parentNodeIsIfStatement && isIdentifier) {
          path.replaceWith(t.stringLiteral(DEFAULT_IDENTIFIER))
        }
      }
    }
  }
}