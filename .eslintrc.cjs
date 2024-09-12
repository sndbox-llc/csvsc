module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,
  ignorePatterns: ["quasar.config.js"],

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  // Must use parserOptions instead of 'parser' to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    extraFileExtensions: [".vue"],
    parser: "@typescript-eslint/parser",
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    "eslint:recommended",

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    "plugin:@typescript-eslint/recommended",

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    "plugin:vue/vue3-essential", // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    "prettier",
    "plugin:jsdoc/recommended",
  ],

  plugins: [
    // required to apply rules which need type information
    "@typescript-eslint",
    "import",

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    "vue",
    "jsdoc",
  ],

  globals: {
    ga: "readonly", // Google Analytics
    cordova: "readonly",
    __statics: "readonly",
    __QUASAR_SSR__: "readonly",
    __QUASAR_SSR_SERVER__: "readonly",
    __QUASAR_SSR_CLIENT__: "readonly",
    __QUASAR_SSR_PWA__: "readonly",
    process: "readonly",
    Capacitor: "readonly",
    chrome: "readonly",
  },
  // add your custom rules here
  rules: {
    "import/no-duplicates": "error",
    "import/no-relative-parent-imports": "error",
    "no-void": "off",
    "prefer-promise-reject-errors": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 追加分
    "no-constant-condition": "off",
    // jsDoc
    "jsdoc/require-param": "off",
    "jsdoc/require-returns": "off",
    "jsdoc/newline-after-description": "off",
    "jsdoc/require-returns-type": "off",
    "jsdoc/require-param-type": "off",

    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-imports": "warn",
    // vue
    "vue/no-setup-props-destructure": "off",
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-mutating-props": "off",
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/no-v-text-v-html-on-component": "off",
    "vue/no-undef-components": [
      "error",
      {
        ignorePatterns: ["q-", "router"],
      },
    ],
  },
};
