'use strict';


const my_promise = require('./my-promise');

function sumUpTo2(number) {
    return new my_promise.MyPromise((resolve, reject) => {
        // 단순히 2초 뒤 number까지의 합을 계산하는 함수
        setTimeout(() => {
            let sum = 0;

            for (let i = 1; i < number; ++i) {
                sum += i;
            }

            resolve(sum);
        }, 2000);
    });
}

sumUpTo2(100).then(sum => { console.log(`sum : ${sum}`) })

return

function sumUpTo(number) {
    return new Promise((resolve, reject) => {
        let sum = 0;

        for (let i = 1; i < number; ++i) {
            sum += i;
        }

        resolve(sum);
    });
}

sumUpTo(100).then(sum => { console.log(`sum : ${sum}`)})

return 
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
