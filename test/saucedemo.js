const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

async function saucedemoLoginTest() {
  // Membuat koneksi dengan webdriver
  let option = new chrome.Options();
  option.addArguments("--headless");

  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(option)
    .build();

  // Exception Handling & Conclusion
  try {
    // Buka URL di browser
    await driver.get("https://saucedemo.com");

    // User success login
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // Validate user berada di dashboard setelah login
    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(
      titleText.includes("Swag Labs"),
      true,
      'Title does not include "Swag Labs"'
    );
    console.log("User is on the dashboard after login");

    // Add item to cart
    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();

    // Validate item sukses ditambahkan ke cart
    let cartBadge = await driver.findElement(By.className("shopping_cart_badge")).getText();
    assert.strictEqual(
      cartBadge,
      "1",
      "Item was not added to the cart"
    );
    console.log("Item successfully added to the cart");

  } finally {
    await driver.quit();
  }
}

saucedemoLoginTest();
