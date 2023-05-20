module.exports = {
    extends: '@ecomfe/stylelint-config',
    customSyntax: 'postcss-scss',
    plugins: ['stylelint-scss'],
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
    },
};
