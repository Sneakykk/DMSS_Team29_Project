const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Login", function () {
  this.timeout(30000);
  let driver;
  let vars;

  beforeEach(async function () {
    const options = new chrome.Options();
    options.addArguments("--headless"); // Comment out or remove for GUI mode
    options.addArguments("--disable-gpu"); // Optional: only needed for headless
    options.addArguments("--window-size=1536,824"); // Sets the window size
    options.addArguments("--ignore-ssl-errors=yes");
    options.addArguments("--ignore-certificate-errors")

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    vars = {};
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("Login", async function () {
      await driver.get("https://octopus-app-m8hyy.ondigitalocean.app");
      
      await driver.findElement(By.name("username")).click();
      await driver.findElement(By.name("username")).sendKeys("pck");
      await driver.findElement(By.name("password")).click();
      // const pageSource = await driver.pageSource;
      console.log((await driver.getTitle()));
      await driver.findElement(By.name("password")).sendKeys("passwordPCK");
      await driver.findElement(By.css(".login-button")).click();
      await driver.sleep(1000); // Wait for 1 second before fetching the text for debugging
      
      const dashboardText = await driver.findElement(By.css("h2")).getText();
      console.log("Dashboard Text: ", dashboardText); // This will show you what is being captured
      assert.strictEqual(dashboardText, "Dashboard");

      return Promise.resolve();
  });
});

describe("Invalid Login", function () {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function () {
    const options = new chrome.Options();
    options.addArguments("--headless"); // Comment out or remove for GUI mode
    options.addArguments("--disable-gpu"); // Optional: only needed for headless
    options.addArguments("--window-size=1536,824"); // Sets the window size
    options.addArguments("--ignore-ssl-errors=yes");
    options.addArguments("--ignore-certificate-errors")

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    vars = {};
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("Invalid Login", async function () {
    await driver.get("https://octopus-app-m8hyy.ondigitalocean.app");
    await driver.manage().window().setRect({ width: 1536, height: 824 });
    await driver.findElement(By.name("username")).click();
    await driver.findElement(By.name("username")).sendKeys("pck");
    await driver.findElement(By.name("password")).click();
    await driver.findElement(By.name("password")).sendKeys("password");
    await driver.findElement(By.css(".login-button")).click();
    await driver.sleep(1000); // Wait for 1 second before fetching the text for debugging
    assert(
      (await driver.findElement(By.css(".error")).getText()) ===
        "LOGIN FAILED. PLEASE TRY AGAIN."
    );
  });
});

describe("AddToCart", function () {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function () {
    const options = new chrome.Options();
    options.addArguments("--headless"); // Comment out or remove for GUI mode
    options.addArguments("--disable-gpu"); // Optional: only needed for headless
    options.addArguments("--window-size=1536,824"); // Sets the window size
    options.addArguments("--ignore-ssl-errors=yes");
    options.addArguments("--ignore-certificate-errors")

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    vars = {};
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("AddToCart", async function () {
    await driver.get("https://octopus-app-m8hyy.ondigitalocean.app");
    await driver.manage().window().setRect({ width: 1536, height: 824 });
    await driver.findElement(By.name("username")).click();
    await driver.findElement(By.name("username")).sendKeys("pck");
    await driver.findElement(By.name("password")).click();
    await driver.findElement(By.name("password")).sendKeys("passwordPCK");
    await driver.findElement(By.css(".login-button")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".menu-icon > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.linkText("Food")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".menu:nth-child(1) > .menu-btn")).click();
    await driver.sleep(1000);
    await driver
      .findElement(By.css(".food-card:nth-child(1) > button"))
      .click();
    await driver.sleep(1000);
    await driver
      .findElement(By.css(".food-card:nth-child(2) > button"))
      .click();
    await driver.sleep(1000);
    await driver
      .findElement(By.css(".food-card:nth-child(3) > button"))
      .click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".clicked > .menu-btn")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".menu:nth-child(2) > .menu-btn")).click();
    await driver.sleep(1000);
    await driver
      .findElement(By.css(".food-card:nth-child(2) > button"))
      .click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".clicked > .menu-btn")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".menu:nth-child(3) > .menu-btn")).click();
    await driver.sleep(1000);
    await driver
      .findElement(By.css(".food-card:nth-child(2) > button"))
      .click();
    await driver.sleep(1000);
    await driver.findElement(By.css("svg:nth-child(2)")).click();
    await driver.sleep(1000);
    assert(
      (await driver.findElement(By.css("tfoot td")).getText()) ===
        "Total Price: $22.00"
    );
  });
});

describe("OrderHistory", function () {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function () {
    const options = new chrome.Options();
    options.addArguments("--headless"); // Comment out or remove for GUI mode
    options.addArguments("--disable-gpu"); // Optional: only needed for headless
    options.addArguments("--window-size=1536,824"); // Sets the window sizez
    options.addArguments("--ignore-ssl-errors=yes");
    options.addArguments("--ignore-certificate-errors")

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    vars = {};
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("OrderHistory", async function () {
    await driver.get("https://octopus-app-m8hyy.ondigitalocean.app");
    await driver.manage().window().setRect({ width: 1536, height: 824 });
    await driver.findElement(By.name("username")).click();
    await driver.findElement(By.name("username")).sendKeys("pck");
    await driver.findElement(By.name("password")).click();
    await driver.findElement(By.name("password")).sendKeys("passwordPCK");
    await driver.findElement(By.css(".login-button")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css(".menu-icon > svg")).click();
    await driver.sleep(1000);
    await driver.findElement(By.linkText("Order History")).click();
    await driver.sleep(1000);
    assert(
      (await driver.findElement(By.css("th:nth-child(1)")).getText()) === "S/N"
    );
    await driver.sleep(1000);
    assert(
      (await driver.findElement(By.css("th:nth-child(2)")).getText()) ===
        "ORDERS"
    );
  });
});
