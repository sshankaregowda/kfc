// import dotenv from "dotenv";

// dotenv.config({ path: `.env.${process.env.ENV || "uat"}` });
//import { config } from "../config/env";


// import { Before, After } from "@cucumber/cucumber";
// import { chromium, firefox, webkit, Browser, BrowserContext } from "@playwright/test";
// import { CustomWorld } from "./CustomWorld";

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
import { config } from "../../support/env";
import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, BrowserContext } from "@playwright/test";
import { CustomWorld } from "../../support/CustomWorld";
import path from "path";

let context: BrowserContext;

setDefaultTimeout(30000);

Before(async function (this: CustomWorld) {

  const userDataDir = path.join(process.cwd(), "playwright-user-data");

  context = await chromium.launchPersistentContext(userDataDir, {
    channel: "chrome",
    headless: false,
    slowMo: 300
  });

  this.page = context.pages()[0] || await context.newPage();

  await this.page.goto(config.baseUrl)

  console.log("Current URL:", this.page.url());
});

After(async function () {
  await context?.close();
});