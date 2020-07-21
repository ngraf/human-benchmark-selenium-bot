Feature('Visual Memory');

Scenario('[S04] Visual Memory', async (I) => {
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
