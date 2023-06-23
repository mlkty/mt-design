module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'react/button-has-type': 0,
  },
  ignorePatterns: ['**/dist/**', '**/lib/**', '**/es/**', '**/node_modules/**'],
};
