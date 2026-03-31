import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { OrderPage } from "../pages/OrderPage";
import { OrderSummaryPage } from "../pages/OrderSummaryPage";


export class CustomWorld extends World {
  debug = false;
  page!: Page;
  storeName?: string; 

  get homePage() {
    return new HomePage(this.page);
  }

  get orderPage() {
    return new OrderPage(this.page)
  }

  get orderSummaryPage() {
    return new OrderSummaryPage(this.page)
  }
}

setWorldConstructor(CustomWorld);