const DEFAULT_IDENTIFIER = "__DEBUG__"

module.exports = function devLog ({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        const { customIdentifier } = getOpts(state)
        const parentNodeIsIfStatement = t.isIfStatement(path.parent)
        const isIdentifier = path.node.name === customIdentifier
        
        if (parentNodeIsIfStatement && isIdentifier) {
          path.replaceWith(t.stringLiteral(customIdentifier))
        }
      }
    }
  }
}

function getOpts (state) {
  const opts = state.opts ?? {}
  return {
    customIdentifier: opts.customIdentifier ?? DEFAULT_IDENTIFIER
  }
}