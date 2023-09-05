module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  ignorePatterns: ['build/*', 'jest.setup.ts'],
  overrides: [
    {
      files: ['./*.ts', 'cypress/**/*.{tsx,ts,js}', 'src/**/*.{tsx,ts,js}'],
      env: {
        browser: true,
        node: false,
      },
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
      settings: {
        react: {
          version: 'detect',
        },
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
