const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');
const firefox = require('selenium-webdriver/firefox');
const LoginPage = require('./pom/loginPage');
const DashboardPage = require('./pom/DashboardPage');
const CartPage = require('./pom/CartPage');
const CheckoutPage = require('./pom/CheckoutPage');
const fs = require('fs');

if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
}

async function runTest() {
    const browsers = ['chrome', 'MicrosoftEdge', 'firefox'];

    for (const browser of browsers) {
        let driver;
        let options;

        if (browser === 'chrome') {
            options = new chrome.Options();
            options.addArguments('--headless');
            driver = new Builder().forBrowser(browser).setChromeOptions(options).build();
        } else if (browser === 'MicrosoftEdge') {
            options = new edge.Options();
            options.addArguments('--headless');
            driver = new Builder().forBrowser(browser).setEdgeOptions(options).build();
        } else if (browser === 'firefox') {
            options = new firefox.Options();
            options.addArguments('--headless');
            driver = new Builder().forBrowser(browser).setFirefoxOptions(options).build();
        }

        try {
            const loginPage = new LoginPage(driver);
            const dashboardPage = new DashboardPage(driver);
            const cartPage = new CartPage(driver);
            const checkoutPage = new CheckoutPage(driver);

            console.log(`Menjalankan tes pada ${browser}...`);

            console.log("Menavigasi ke halaman login...");
            await loginPage.navigate();
            await loginPage.takeScreenshot('login_page.png');

            console.log("Memasukkan nama pengguna...");
            await loginPage.enterUsername('standard_user');

            console.log("Memasukkan kata sandi...");
            await loginPage.enterPassword('secret_sauce');

            console.log("Mengklik tombol login...");
            await loginPage.clickLogin();
            await dashboardPage.takeScreenshot('dashboard_page.png');

            console.log("Memvalidasi dashboard...");
            await dashboardPage.validateDashboard();

            console.log("Menambahkan item ke keranjang...");
            await cartPage.addItemToCart();
            await cartPage.takeScreenshot('item_added.png');

            console.log("Menavigasi ke keranjang...");
            await cartPage.goToCart();

            console.log("Memvalidasi item di keranjang...");
            const isItemAdded = await cartPage.validateItemInCart();
            console.log(`Item ditambahkan ke keranjang: ${isItemAdded}`);

            console.log("Melanjutkan ke checkout...");
            await checkoutPage.proceedToCheckout();

            console.log("Menyelesaikan checkout...");
            await checkoutPage.completeCheckout('John', 'Doe', '12345');
            await checkoutPage.takeScreenshot('checkout_complete.png');

        } catch (error) {
            console.error(`Kesalahan selama eksekusi tes pada ${browser}:`, error);
        } finally {
            if (driver) {
                console.log("Menutup driver...");
                await driver.quit();
            }
        }
    }
}

runTest();
