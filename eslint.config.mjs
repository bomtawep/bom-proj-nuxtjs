import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  root: true,
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-console': 'off'
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ]
})