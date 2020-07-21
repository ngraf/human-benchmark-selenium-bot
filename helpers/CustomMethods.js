
class CustomMethods extends Helper {


    /**
     * Checks if element is present in DOM.
     *
     * @param magicLocator
     * @returns {Promise<boolean>} Returns "true" is element is present, otherwise "false"
     */
    async isElementPresent(magicLocator) {
        return (await detectBrowserHelper()._locate(magicLocator)).length > 0;
    }
}

module.exports = CustomMethods;

function detectBrowserHelper() {
    const browserHelpers = ['WebDriver','Protractor','Puppeteer','TestCafe','Nigthmare','Playwright'];
    const configuredHelpers = codeceptjs.container.helpers();
    for (const helper of browserHelpers) {
        if (Object.keys(configuredHelpers).indexOf(helper) >= 0) return codeceptjs.container.helpers(helper);
    }
    throw new Error(`[ERROR] No browser helper configured in CodeceptJS config. Expecting one of these: ${browserHelpers}`);
}
