module.exports = {
    parser: "babel-eslint",
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true,
    }, 
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:jsx-a11y/recommended"
    ],
    plugins: [
      "react",
      "react-hooks",
      "jsx-a11y",
    ],
    rules: {
      "@typescript-eslint/no-useless-escape": 0,
      semi: [2, "never"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": 0,
      strict: 1,
      "noUnusedLocals": true,
      "noUnusedParameters": true
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }