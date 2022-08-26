module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier', 'prettier/vue'],
  plugins: ['vue'],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error',
  },
};