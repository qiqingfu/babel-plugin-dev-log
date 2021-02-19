const { types: t } = require('@babel/core')
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
module.exports = function devLog() {
  return {
    visitor: {
      Identifier(path, state) {
        const { customIdentifier } = getOpts(state)
        const checkPath = check(path, 'name', customIdentifier)

        if (checkPath) {
          path.replaceWith(t.stringLiteral(customIdentifier))
        }
      },
      StringLiteral(path, state) {
        const { customIdentifier, isProd } = getOpts(state)
        const checkPath = check(path, 'value', customIdentifier)

        if (checkPath && isProd) {
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

/**
 *
 * @param {Object} path
 * @param {String} pathKey
 * @param {any} value
 */
function check(path, pathKey, value) {
  return t.isIfStatement(path.parent) && path.node && path.node[pathKey] === value
}
