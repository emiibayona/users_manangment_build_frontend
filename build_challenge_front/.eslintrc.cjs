/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "error",
    "eqeqeq": "error",
    "strict": "off",
    "quotes": ["error", "double"],
    "no-extra-semi": "error",
    "react/prop-types": "camelcase",
    "space-before-function-paren": "off"
  }
}
