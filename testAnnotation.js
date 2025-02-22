const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');
const firefox = require('selenium-webdriver/firefox');

async function saucedemoLoginTest() {
    const browsers = ["chrome", "MicrosoftEdge", "firefox"];

    for (const browser of browsers) {
        let driver;
        let options;

        // Konfigurasi untuk Chrome, Edge, dan Firefox
        if (browser === "chrome") {
            options = new chrome.Options();
            options.addArguments("--headless"); // Menjalankan dalam mode headless
            driver = new Builder().forBrowser(browser).setChromeOptions(options).build();
        } else if (browser === "MicrosoftEdge") {
            options = new edge.Options();
            options.addArguments("--headless"); // Menjalankan dalam mode headless
            driver = new Builder().forBrowser(browser).setEdgeOptions(options).build();
        } else if (browser === "firefox") {
            options = new firefox.Options();
            options.addArguments("--headless"); // Menjalankan dalam mode headless
            driver = new Builder().forBrowser(browser).setFirefoxOptions(options).build();
        }

        try {
            // Navigasi ke website
            await driver.get('https://www.saucedemo.com');

            // User success login / User Melakukan login
            await driver.findElement(By.id('user-name')).sendKeys('standard_user');
            await driver.findElement(By.id('password')).sendKeys('secret_sauce');
            await driver.findElement(By.id('login-button')).click();

            // Mem validasi kalau user berada di dashboard
            await driver.wait(until.titleIs('Swag Labs'), 10000);
            console.log(`User is on the dashboard in ${browser}`);

            // Menambahkan item ke keranjang
            await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();

            // Mem validasi item berhasil ditambahkan ke keranjang
            const cartCount = await driver.findElement(By.className('shopping_cart_badge')).getText();
            if (cartCount === '1') {
                console.log(`Item successfully added to cart in ${browser}`);
            } else {
                console.error(`Item not added to cart in ${browser}`);
            }
        } catch (error) {
            console.error(`Error during test execution in ${browser}:`, error);
        } finally {
            // Close the browser
            await driver.quit();
        }
    }
}

saucedemoLoginTest();
