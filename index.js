/**
 * @param {String} DEFAULT_IDENTIFIER
 */
const DEFAULT_IDENTIFIER = '__DEV__'

/**
 * @param {Boolean} isProd
 */
const isProd = process.env.NODE_ENV === 'production'

/**
 * entry
 */
module.exports = function devLog({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        const { customIdentifier } = getOpts(state)
        const parentNodeIsIfStatement = t.isIfStatement(path.parent)
        const isIdentifier = path.node.name === customIdentifier

        if (parentNodeIsIfStatement && isIdentifier) {
          path.replaceWith(t.stringLiteral(customIdentifier))
        }
      },
      StringLiteral(path, state) {
        const { customIdentifier, isProd } = getOpts(state)
        const parentNodeIsIfStatement = t.isIfStatement(path.parent)
        const isIdentifier = path.node.value === customIdentifier

        if (parentNodeIsIfStatement && isIdentifier && isProd) {
          path.parentPath.remove()
        }
      }
    }
  }
}

/**
 *
 * @param {Object} state
 * @param {String} state.opts.customIdentifier
 * @param {Boolean} state.opts.isProd
 */
function getOpts(state) {
  const opts = state.opts || {}
  return {
    customIdentifier: opts.customIdentifier || DEFAULT_IDENTIFIER,
    isProd: opts.isProd || isProd
  }
}
