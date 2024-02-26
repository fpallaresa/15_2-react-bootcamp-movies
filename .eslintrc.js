module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true,
        jest: true
      },
      files: [
        '.eslintrc.{js,cjs}',
        '**/*.test.js',
        '**/*.spec.js'
      ],
      parserOptions: {
        sourceType: 'module',
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: 'off',
    'react/react-in-jsx-scope': 'off',
    'space-before-function-paren': 'off',
    'react/jsx-indent': [2, 2],
    'react/prop-types': 'off',
    'jsx-quotes': [2, 'prefer-single'],
    'multiline-ternary': 'off',
    'react/no-unescaped-entities': 'off',
    'comma-dangle': 'off'
  }
}
