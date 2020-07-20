Feature('Human Benchmark');

Scenario('[HB01a] Reaction Time', async (I) => {
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

Scenario('[HB01b] Aim Trainer', async (I) => {
    const loc_target = {css : 'div[data-aim-target] > div:nth-child(6)'};
    I.amOnPage('https://humanbenchmark.com/tests/aim');

    // Click to start ...
    I.click(loc_target);
    I.wait(0.1);

    // Shoot 30 targets ...
    for (let i = 0; i < 30; i++) {
        I.waitForElement(loc_target);
        I.click(loc_target);
    }

    // Get score
    I.wait(1);
    const totalTime = await I.grabTextFrom("//div[./h2[contains(.,'Time to hit')]]/div[1]/h1");
    const speed = await I.grabTextFrom("//div[./h2[contains(.,'Time to hit')]]/div[2]/h1");
    I.say(`FINISHED! It took '${totalTime}s' to hit 30 targets with a speed of '${speed} ms/target'.`);

    // Highscores:
    // #1 Local Selenium:         1,886s  (63 ms/target)
    // #2 Selenoid Selenium:     10,429s (348 ms/target)
    // #3 Browserstack Selenium: 16.191s (540 ms/target)
    // #4 Me as a human:         17,274s (572 ms/target)
});

xScenario('[HB01c] Chimp Test', async (I) => {
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




Scenario('[HB01d] Visual Memory', async (I) => {
    let level = 1;
    let tempScore = '';

    I.amOnPage('https://humanbenchmark.com/tests/memory');
    I.click("//button[text() = 'Start']");
    I.wait(0.5); //perfect

    do {

        const activeTiles = await getActiveTiles(I);

        // Wait for tiles disappearing ...
        I.waitForElement({css : ".squares .square-row:nth-child(" + activeTiles[0].row + ") div[class='square']:nth-child(" + activeTiles[0].column + ")"});
        I.wait(0.1);
        for (let i = 0; i < activeTiles.length; i++) {
            I.click({css : ".squares .square-row:nth-child(" + activeTiles[i].row + ") .square:nth-child(" + activeTiles[i].column + ")"});
        }
        // Finished?
        if (await I.isElementPresent('//button[text() = "Save"]')) {
            break;
        }
        I.waitForElement('.square.active');
        tempScore = await I.grabTextFrom({css: '.big-score'});
        console.log('Finished ' + tempScore);
        level++;
    } while (true);

    // Get score
    const finalScore = await I.grabTextFrom('//h1[contains(text(), "Score")]');
    I.say('Finished! ' + finalScore);

    // Highscores
    // #1 Selenium (local):     38 (wow)
    // #2 Me as a human:        11
    // #3 Selenium (Remote):     2
});







xScenario('[HB01e] Hearing', async (I) => {
    // We skip it, because it can't be automated.
    // It requires real ears to hear the audio and identify when certain Hertz level is reached.
});

Scenario('[HB01f] Typing', async (I) => {
    // Go to challenge
    I.amOnPage('https://humanbenchmark.com/tests/typing');
    // Get to know what text we need to type
    const textToType = await I.grabTextFrom('.letters');

    // Type as fast as you can!
    for (i = 0; i < textToType.length; i++) {
        I.pressKey(textToType[i]);
    }

    // Get speed results and log them
    I.wait(1);
    const wordsPerMinute = await I.grabTextFrom("//div[./h2[contains(.,'Result:')]]/h1");
    const accuracy = await I.grabTextFrom("//div[./h2[contains(.,'Result:')]]/p");
    I.say(`FINISHED! You scored '${wordsPerMinute}' and '${accuracy}'`);

    /* Highscores

    #1 - Selenium:       111 WPM with 100% accuracy
    #2 - Me as a human:   60 WPM with 100% accuracy

     */
});

Scenario('[HB01g] Number Memory', async (I) => {

});
Scenario('[HB01h] Verbal Memory', async (I) => {

});

async function getActiveTiles(I) {
    let activeTiles = [];

    const sizeOfSquare = await I.grabNumberOfVisibleElements({css: '.squares .square-row'});
    for (let row = 1; row <= sizeOfSquare; row++) {
        for (let column = 1; column <= sizeOfSquare; column++) {
            if (await I.isElementPresent({css : ".squares .square-row:nth-child(" + row + ") .square.active:nth-child(" + column + ")"})) {
                activeTiles.push({row: row, column: column});
            }
        }
    }
    return activeTiles;
}
