Feature('Hearing');

xScenario('[S05] Hearing - SKIP, because impossible to automate', async (I) => {
    // We skip it, because it can't be automated.
    // It requires real ears to hear the audio and identify when certain Hertz level is reached.
    I.amOnPage('https://humanbenchmark.com/tests/hearing');
    I.click("//button[text() = 'Start']");
});
