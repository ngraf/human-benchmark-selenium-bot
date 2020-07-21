Feature('Reaction Time');

Scenario('[S01] Reaction Time', async (I) => {
    // Go to challenge
    I.amOnPage('https://humanbenchmark.com/tests/reactiontime');

    // Start challenge
    I.click("//*[text() = 'Click anywhere to start.']");
    do {
        // Wait for "green" ...
        I.waitForElement({css: 'div.view-go'});
        // ... and click it.
        I.click({css: 'div.view-go'});

        // If this was last the round, leave the loop
        if (await I.isElementPresent("//button[text() = 'Save score']")) {
            break;
        }
        // Click to keep going ...
        I.click({css: 'div.view-result'});
    } while (true);

    // Get score
    const average = await I.grabTextFrom('.average');
    I.say(`Finished! You scored with reaction '${average})'`);

    // Highscores:
    // Selenium (local):   81ms
    // Me as a human:     270ms
});
