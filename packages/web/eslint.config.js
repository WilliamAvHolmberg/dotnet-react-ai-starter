import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import * as parser from '@typescript-eslint/parser';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: parser,
      parserOptions: {
        project: true,
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        React: true,
        JSX: true
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      '@typescript-eslint': tseslint.plugin,
    },
    settings: {
      react: {
        version: 'detect',
      }
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/unified-signatures': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-unnecessary-template-expression': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off'
    }
  }
);
