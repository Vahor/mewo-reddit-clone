module.exports = {
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': ['error', {argsIgnorePattern: 'next'}],
        'prettier/prettier': ['warn', {}, {usePrettierrc: true}],
    },
};
