const t = require('babel-types')

module.exports = {

  Statement (node, state, c) {
    if (t.isVariableDeclaration(node)) {
    }
  },

  VariableDeclarator (node, state) {
    if (t.isFunction(node.init)) {
      state.
    }
  }

}
