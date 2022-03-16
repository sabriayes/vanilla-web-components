module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [],
  extends: [
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'webpack.config.js',
  ],
  rules: {
    'curly': ['error', 'all'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['error', { 'props': false }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
  },
};
