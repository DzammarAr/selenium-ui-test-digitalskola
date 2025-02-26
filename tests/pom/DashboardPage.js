const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
    }

    async validateDashboard() {
        await this.driver.wait(until.titleIs('Swag Labs'), 10000);
    }

    async takeScreenshot(filename) {
        const screenshot = await this.driver.takeScreenshot();
        require('fs').writeFileSync(`screenshots/${filename}`, screenshot, 'base64');
    }
}

module.exports = DashboardPage;
