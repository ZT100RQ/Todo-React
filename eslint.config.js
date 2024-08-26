import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import airbnb from 'eslint-config-airbnb';

const { extends: airbnbRules, ...airbnbConfig } = airbnb;

export default [
  { ignores: ['dist', 'node_modules', 'eslint.config,js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'prettier': prettierPlugin,
      'import': importPlugin,
      'airbnb': airbnb,
      'eslint/prettier': eslintConfigPrettier,
    },
    rules: {
      // ...airbnbRules,
      ...prettierPlugin.configs.recommended.rules,
      ...airbnb.rules,
      ...eslintConfigPrettier.rules,
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/react-in-jsx-scope': 'off',
      'linebreak-style': [0, 'unix'],
      'quotes': ["error", "single"],
      'semi': 0,
      'endOfLine': 'off',
      'react/prop-types': 0,
      "prettier/prettier": [
    "error",
    {
      "singleQuote": true,
      "parser": "flow",
      "endOfLine": "auto"
    }
  ],
      'indent': ['error', 2],
      "no-mixed-spaces-and-tabs": 0,
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    
  },
];
