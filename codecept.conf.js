exports.config = {

    tests: 'tests/**/*_test.js',

    helpers: {
        Protractor: {
            seleniumAddress: 'http://localhost:4444/wd/hub',
            browser: 'chrome',
            angular: false,
            waitForTimeout: 10000, // default: 1000
        },
        CustomMethods: {
            require: './helpers/CustomMethods.js'
        },
    },
};
