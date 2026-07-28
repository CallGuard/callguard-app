module.exports = {
  root: true,
  extends: ['universe', 'universe/web', 'universe/native', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['import', 'prettier'],
  rules: {
    // Clean Code: Forçar padrões de código limpo
    'prettier/prettier': 'error',
    'no-console': 'warn', // Apenas warnings, mas idealmente deve-se usar o Logger.ts
    'no-param-reassign': 'error', // SOLID: Evita efeitos colaterais em parâmetros
    'consistent-return': 'error',
    
    // Regras de TypeScript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error', // Clean Code: Proíbe o uso de 'any'
    
    // Ordenação de Imports (Ajuda na legibilidade do Open Source)
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'react-native', group: 'external', position: 'before' },
          { pattern: '@app/**', group: 'internal', position: 'after' },
          { pattern: '@/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  ignorePatterns: ['/node_modules', '/android', '/ios', '/dist', '.expo'],
};
