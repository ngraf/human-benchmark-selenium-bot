Feature('Aim Trainer');

Scenario('[S02] Aim Trainer', async (I) => {
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
