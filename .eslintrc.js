module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    "linebreak-style": [0 ,"error", "windows"],
    "consistent-return":"off",
    "no-lonely-if":"off",
    "indent":"off",
    "no-param-reassign": "off",
    'import/no-unresolved': 0,
  },
  "settings": {
    "import/resolver": {
        "alias": {
            "map": [
                ["pc", "./src/pc-project/"],
                ["h5", "./src/h5Project/"]
            ],
            "extensions": [".ts", ".vue"]
        },
    },
  },
};
