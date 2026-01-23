export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      // General JS
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",

      // Best practices
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "prefer-const": "error",

      // Async safety
      "no-return-await": "error",

      // Style
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
