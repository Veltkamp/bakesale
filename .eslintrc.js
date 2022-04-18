module.exports = {
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
    ],
    rules: {
        "semi": [
            2,
            "always"
          ],
          "no-console": 0,
          "vue/html-indent": [
            "error",
            4
          ],
          "multiline-ternary": [
              "error"
          ],
          "no-multiple-template-root": 0
    }
  }