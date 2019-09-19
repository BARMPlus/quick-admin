module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'vue/require-component-is': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-new': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-unused-expressions': [2, { 'allowShortCircuit': true, 'allowTernary': true }],
    'no-mixed-operators': [0],
    'no-useless-escape': 0,
    'prefer-promise-reject-errors': 0,
    'standard/computed-property-even-spacing':0,
    'camelcase': [0, { 'properties': 'always' }]
  }
}
