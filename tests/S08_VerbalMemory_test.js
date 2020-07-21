Feature('Verbal Memory');

Scenario('[S08] Verbal Memory', async (I) => {
    I.amOnPage('https://humanbenchmark.com/tests/verbal-memory');
    I.click("//button[text() = 'Start']");

    let words = [];
    let score = 0;
    do {
        I.waitForElement(loc_word);
        const word = await I.grabTextFrom(loc_word);
        if (words.indexOf(word) === -1) {
            words.push(word);
            I.click("//button[text() = 'NEW']");
        } else {
            I.click("//button[text() = 'SEEN']");
        }
        score++;
        console.log('Score: ' + score);
    } while (true);


});

/**
 * Highscores:
 * #1 Selenium:    10000+  .. stopped at 10.000
 * #2 Me as human:    26
 */

const loc_word = {css: '.word'};
