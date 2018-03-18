'use strict';

const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://www.google.com/ncr');
        driver.getTitle().then(v => console.log(v));

        //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
})();
return

const chrome = require('selenium-webdriver/chrome');
//const firefox = require('../firefox');

const width = 1920;
const height = 1080;

let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(
    new chrome.Options().headless().windowSize({ width, height }))
    .build();

driver.get('http://www.google.com/ncr')
    .then(_ =>
        console.log(driver.getTitle()))
        //driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN))
    //.then(_ => driver.wait(until.titleIs('webdriver - Google Search'), 1000))
    .then(
    _ => driver.quit(),
    e => driver.quit().then(() => { throw e; }));
