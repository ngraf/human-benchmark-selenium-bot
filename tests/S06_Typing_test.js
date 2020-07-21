Feature('Typing');

Scenario('[S06] Typing', async (I) => {
    // Go to challenge
    I.amOnPage('https://humanbenchmark.com/tests/typing');
    // Get to know what text we need to type
    const textToType = await I.grabTextFrom('.letters');

    // Type as fast as you can!
    for (let i = 0; i < textToType.length; i++) {
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
