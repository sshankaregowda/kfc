// import dotenv from "dotenv";

// dotenv.config({ path: `.env.${process.env.ENV || "uat"}` });
// import { config } from "../../support/env";


// import { Before, After } from "@cucumber/cucumber";
// import { chromium, firefox, webkit, Browser, BrowserContext } from "@playwright/test";
// import { CustomWorld } from "../../support/CustomWorld";

// let browser: Browser;
// let context: BrowserContext;

// Before(async function (this: CustomWorld) {
//   const browserType = process.env.BROWSER || "chromium";

//   const browserMap = {
//     chromium,
//     firefox,
//     webkit
//   };

//   if (!(browserType in browserMap)) {
//     throw new Error(`Unsupported browser: ${browserType}`);
//   }

//   const browserLauncher = browserMap[browserType as keyof typeof browserMap];

//   browser = await browserLauncher.launch({
//     headless: false
//   });

//   context = await browser.newContext();
//   this.page = await context.newPage();
// });

// After(async function () {
//   await this.page.waitForTimeout(60000)
//   await context?.close();
//   await browser?.close();
// });

//import dotenv from "dotenv";
// dotenv.config({ path: `.env.${process.env.ENV || "uat"}` });
// import { config } from "../../support/env";
// import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
// import { chromium, BrowserContext } from "@playwright/test";
// import { CustomWorld } from "../../support/CustomWorld";
// import path from "path";

// let context: BrowserContext;

// setDefaultTimeout(60000);

// import fs from "fs";

// Before(async function (this: CustomWorld) {

//   const userDataDir = path.join(process.cwd(), "playwright-user-data");

//   // ✅ DELETE CACHE / SESSION
//   if (fs.existsSync(userDataDir)) {
//     fs.rmSync(userDataDir, { recursive: true, force: true });
//   }

//   context = await chromium.launchPersistentContext(userDataDir, {
//     channel: "chrome",
//     headless: false,
//     slowMo: 300
//   });

//   this.page = context.pages()[0] || await context.newPage();

//   await this.page.goto(config.baseUrl);

//   console.log("Current URL:", this.page.url());
// });

// After(async function () {
//   await context?.close();
// });

import { config } from "../../support/env";
import {
  BeforeAll,
  Before,
  After,
  setDefaultTimeout,
  Status
} from "@cucumber/cucumber";
import {
  chromium,
  firefox,
  webkit,
  BrowserContext,
  BrowserType
} from "@playwright/test";
import { CustomWorld } from "../../support/CustomWorld";
import path from "path";
import fs from "fs";

let context: BrowserContext;

setDefaultTimeout(60000);

function getBrowserType(browserName: string): BrowserType {
  switch (browserName.toLowerCase()) {
    case "chromium":
    case "chrome":
      return chromium;
    case "firefox":
      return firefox;
    case "webkit":
      return webkit;
    default:
      throw new Error(
        `Unsupported browser: ${browserName}. Use chromium, chrome, firefox, or webkit.`
      );
  }
}

BeforeAll(async function () {
  const screenshotsDir = path.join(process.cwd(), "test-results", "screenshots");

  // delete old screenshots folder completely
  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true, force: true });
  }

  // create fresh screenshots folder
  fs.mkdirSync(screenshotsDir, { recursive: true });

  console.log(`Fresh screenshots folder created: ${screenshotsDir}`);
});

Before(async function (this: CustomWorld) {
  const browserName = process.env.BROWSER || "chromium";
  const browserType = getBrowserType(browserName);

  const userDataDir = path.join(
    process.cwd(),
    `playwright-user-data-${browserName.toLowerCase()}`
  );

  if (fs.existsSync(userDataDir)) {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }

  const launchOptions: Parameters<typeof chromium.launchPersistentContext>[1] = {
    channel: "chrome",
    headless: false,
    slowMo: 300
  };

  if (browserName.toLowerCase() === "chrome") {
    launchOptions.channel = "chrome";
  }

  context = await browserType.launchPersistentContext(userDataDir, launchOptions);

  this.page = context.pages()[0] || await context.newPage();

  await this.page.goto(config.baseUrl);

  console.log("Running on browser:", browserName);
  console.log("Current URL:", this.page.url());
});

After(async function (this: CustomWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const screenshotsDir = path.join(process.cwd(), "test-results", "screenshots");

      const safeScenarioName = scenario.pickle.name
        .replace(/[^a-zA-Z0-9-_ ]/g, "")
        .replace(/\s+/g, "_");

      const screenshotPath = path.join(
        screenshotsDir,
        `${safeScenarioName}-${Date.now()}.png`
      );

      await this.page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      const screenshotBuffer = fs.readFileSync(screenshotPath);
      await this.attach(screenshotBuffer, "image/png");

      console.log(`Screenshot captured: ${screenshotPath}`);
    }
  } finally {
    await context?.close();
  }
});