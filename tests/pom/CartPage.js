const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async addItemToCart() {
        await this.driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();
    }

    async validateItemInCart() {
        const cartCount = await this.driver.findElement(By.className('shopping_cart_badge')).getText();
        return cartCount === '1';
    }

    async goToCart() {
        await this.driver.findElement(By.className('shopping_cart_link')).click();
    }

    async takeScreenshot(filename) {
        const screenshot = await this.driver.takeScreenshot();
        require('fs').writeFileSync(`screenshots/${filename}`, screenshot, 'base64');
    }
}

module.exports = CartPage;
