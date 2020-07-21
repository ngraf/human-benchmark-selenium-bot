Feature('Chimp Test');

xScenario('[S03] Chimp Test - SKIPPED, because we miss a smart solution', async (I) => {
    I.amOnPage('https://humanbenchmark.com/tests/chimp');
    I.click("//button[text() = 'Start Test']");
    I.click("//div[text() = '1']");
    I.click("//div[text() = '2']");
    I.click("//div[text() = '3']");
    I.click("//div[text() = '4']");

    I.click("//button[text() = 'Continue']");
    I.click("//div[text() = '1']");
    // Numbers are now blacked out.
    // TODO: We miss a smart solution for this riddle ...
    // ... maybe save x/y position before they disappear. The hard part is that clicking in x/y in CodeceptJS is no native method.
    // I.click("//div[text() = '2']");
    // I.click("//div[text() = '3']");
    // I.click("//div[text() = '4']");
    // I.click("//div[text() = '5']");
});
