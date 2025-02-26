const { By, until } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
    }

    async proceedToCheckout() {
        console.log("Waiting for the checkout button to be located...");
        await this.driver.wait(until.elementLocated(By.css('#checkout')), 10000);
        console.log("Checkout button located. Clicking the checkout button...");
        await this.driver.findElement(By.css('#checkout')).click();
    }

    async completeCheckout(firstName, lastName, postalCode) {
        await this.driver.findElement(By.id('first-name')).sendKeys(firstName);
        await this.driver.findElement(By.id('last-name')).sendKeys(lastName);
        await this.driver.findElement(By.id('postal-code')).sendKeys(postalCode);
        await this.driver.findElement(By.id('continue')).click();
        await this.driver.findElement(By.id('finish')).click();
    }

    async takeScreenshot(filename) {
        const screenshot = await this.driver.takeScreenshot();
        require('fs').writeFileSync(`screenshots/${filename}`, screenshot, 'base64');
    }
}

module.exports = CheckoutPage;
