Feature('Number Memory');

Scenario('[S07] Number Memory', async (I) => {
    I.amOnPage('https://humanbenchmark.com/tests/number-memory');
    I.click("//button[text() = 'Start']");
    let level = 1;

    do {
        I.waitForElement(loc_numberIHaveToRemember);
        const numberIHaveToRemember = await I.grabTextFrom(loc_numberIHaveToRemember);
        I.waitForElement(loc_submitButton, 60);
        I.fillField('.number-memory-test input', numberIHaveToRemember);
        I.click(loc_submitButton);
        I.waitForElement(loc_nextButton);
        I.wait(0.5);
        console.log('Finished Level ' + level);
        I.click(loc_nextButton);
        level++;
    } while (true)

});

/**
 * HIGHSCORES
 * #1 Selenium :        45+ (can go on forever .. depends on Selenium timeout)
 * #2 Me as a human:     7
 */

const loc_numberIHaveToRemember = '.big-number';
const loc_submitButton = '//button[text() = "Submit"]';
const loc_nextButton = '//button[text() = "NEXT"]';
