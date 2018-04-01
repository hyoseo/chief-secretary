'use strict';

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const width = 1920;
const height = 1080;

(async function run() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless().windowSize({ width, height }))
        .build();

    const stockAddresses = [];

    try {
        for (let i = 1; i <= 10; ++i) {
            await driver.get(`http://finance.naver.com/sise/sise_market_sum.nhn?&page=${i}`);

            //console.log(await driver.getTitle());
            //console.log(await driver.wait(until.elementLocated(By.className('tltle'))).getText());

            const kospiStocks = await driver.findElements(By.className('tltle'));
            for (const stock of kospiStocks) {
                stockAddresses.push(await stock.getAttribute('href'))
            }
        }

        console.log(`stockAddresses length : ${stockAddresses.length}`);

        //driver.getTitle().then(v => console.log(v));
        //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } catch (err) {
        console.log(err);
    } finally {
        await driver.quit();
    }
})();