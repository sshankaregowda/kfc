import { config } from "../../support/env";
import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "@playwright/test";
import type { Browser, BrowserContext, BrowserType, Page } from "@playwright/test";
import { CustomWorld } from "../../support/CustomWorld";
import path from "path";
import fs from "fs";

let browser: Browser;
let context: BrowserContext;
let page: Page;

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

  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true, force: true });
  }

  fs.mkdirSync(screenshotsDir, { recursive: true });

  const browserName = (process.env.BROWSER || "chromium").toLowerCase();
  const browserType = getBrowserType(browserName);

  const launchOptions: Parameters<typeof chromium.launch>[0] = {
    headless: false,
    // slowMo: 300, // keep this only when debugging
  };

  if (browserName === "chrome") {
    launchOptions.channel = "chrome";
  }

  browser = await browserType.launch(launchOptions);

  console.log(`Browser launched once: ${browserName}`);
});

Before(async function (this: CustomWorld) {
  context = await browser.newContext({
    viewport: null,
  });

  page = await context.newPage();
  this.page = page;

  await this.page.goto(config.baseUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await this.page.waitForTimeout(2000);

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
        fullPage: true,
      });

      const screenshotBuffer = fs.readFileSync(screenshotPath);
      await this.attach(screenshotBuffer, "image/png");

      console.log(`Screenshot captured: ${screenshotPath}`);
    }
  } finally {
    await context?.close();
  }
});

AfterAll(async function () {
  await browser?.close();
});