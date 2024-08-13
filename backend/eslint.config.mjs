export default [
    {
      files: ['**/*.{js,mjs}'],
      rules: {
        'no-unused-vars': 'warn',
        'no-console': 'off',
        // Adicione outras regras aqui conforme necessário
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
      },
      env: {
        browser: true,
        node: true
      },
      extends: [
        'eslint:recommended',
        // Outros estendimentos podem ser adicionados aqui
      ]
    }
  ];
  