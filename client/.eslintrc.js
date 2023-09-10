module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['vue'],
  rules: {
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true,
        ignore: [],
      },
    ],
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error',
  },
};
