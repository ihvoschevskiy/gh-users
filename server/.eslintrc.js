module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  ignorePatterns: ['build/'],
  overrides: [
    {
      files: ['./*.ts', 'src/**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars':
          process.env.NODE_ENV === 'production'
            ? ['error', { argsIgnorePattern: 'next' }]
            : ['warn', { argsIgnorePattern: 'next' }],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort'],
  root: true,
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-warning-comments': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      {
        terms: ['todo', 'fix'],
        location: 'start',
        decoration: ['/', '*'],
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\u0000', '^', '^@?\\w', '^\\.', '^node:']],
      },
    ],
  },
}
