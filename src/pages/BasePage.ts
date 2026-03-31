import type { Page } from "@playwright/test";

// this is base page
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

}