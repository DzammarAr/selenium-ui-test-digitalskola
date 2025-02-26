const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigate() {
        await this.driver.get('https://www.saucedemo.com');
    }

    async enterUsername(username) {
        await this.driver.findElement(By.id('user-name')).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement(By.id('password')).sendKeys(password);
    }

    async clickLogin() {
        await this.driver.findElement(By.id('login-button')).click();
    }

    async takeScreenshot(filename) {
        const screenshot = await this.driver.takeScreenshot();
        require('fs').writeFileSync(`screenshots/${filename}`, screenshot, 'base64');
    }
}

module.exports = LoginPage;
