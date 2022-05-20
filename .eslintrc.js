module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    "env": {
      "node": true // cd. https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    }
  };