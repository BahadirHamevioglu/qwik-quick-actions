module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:qwik/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "unused-imports", "import", "@stylistic"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "unused-imports/no-unused-imports": "error",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: "@/**",
            group: "external",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "import/prefer-default-export": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],

    "space-infix-ops": ["error"],

    "@stylistic/indent": ["error", 2],
    "@stylistic/block-spacing": "error",
    "@stylistic/no-trailing-spaces": "error",
    "@stylistic/space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "@stylistic/padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "block-like",
      },
    ],
    "@stylistic/padded-blocks": ["error", "never"],
    "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "@stylistic/comma-dangle": ["error", "never"],
    "@stylistic/comma-spacing": [
      "error",
      {
        before: false,
        after: true,
      },
    ],
    "@stylistic/function-call-spacing": ["error", "never"],
    "@stylistic/key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "@stylistic/keyword-spacing": ["error"],
    "@stylistic/member-delimiter-style": "error",
    "@stylistic/no-extra-semi": "error",
    "@stylistic/semi": "error",
    "@stylistic/space-before-blocks": "error",
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/object-curly-newline": [
      "error",
      {
        multiline: true,
        minProperties: 2,
      },
    ],
    "@stylistic/object-property-newline": "error",
    "@stylistic/type-annotation-spacing": "error",
    "@stylistic/array-bracket-newline": [
      "error",
      {
        multiline: true,
        minItems: 2,
      },
    ],
    "@stylistic/array-element-newline": [
      "error",
      {
        multiline: true,
        minItems: 2,
      },
    ],
    "@stylistic/array-bracket-spacing": "error",
    "@stylistic/comma-style": "error",
    "@stylistic/no-floating-decimal": "error",
    "@stylistic/no-multi-spaces": "error",

    "@stylistic/jsx-indent": ["error", 2],
    "@stylistic/jsx-closing-bracket-location": [1, "tag-aligned"],
    "@stylistic/jsx-closing-tag-location": [1],
    "@stylistic/jsx-curly-brace-presence": [
      1,
      {
        props: "never",
        children: "never",
        propElementValues: "always",
      },
    ],
    "@stylistic/jsx-curly-spacing": [2, "never"],
    "@stylistic/jsx-equals-spacing": [2, "never"],
    "@stylistic/jsx-first-prop-new-line": [2, "multiprop"],
    "@stylistic/jsx-max-props-per-line": [2, { maximum: 1 }],
    "@stylistic/jsx-props-no-multi-spaces": [2],
    "@stylistic/jsx-self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "@stylistic/jsx-sort-props": [
      2,
      {
        callbacksLast: true,
        shorthandLast: true,
      },
    ],
    "@stylistic/jsx-tag-spacing": [
      2,
      {
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never",
      },
    ],
    "@stylistic/jsx-wrap-multilines": [
      2,
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line",
      },
    ],
    "@stylistic/type-generic-spacing": ["error"],
    "@stylistic/type-named-tuple-spacing": ["error"],
    "qwik/no-use-visible-task": "off",
    "qwik/use-method-usage": "off",
    "qwik/jsx-img": "off",
  },
};
