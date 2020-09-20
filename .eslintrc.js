module.exports = {
  "extends": [
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}