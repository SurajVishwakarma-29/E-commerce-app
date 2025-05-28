# E-commerce App (React + TypeScript + Vite)

This project is a fashion e-commerce store built using React, TypeScript, and Vite.

## Features
- Fast refresh with Vite
- Type-safe development using TypeScript
- ESLint configuration for code quality

## Vite + ESLint Setup Notes

This setup includes minimal configuration to get started with ESLint and type-aware linting.

To expand your ESLint rules for production, use:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
