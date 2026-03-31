import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { OrderPage } from "../pages/OrderPage";
import { OrderSummaryPage } from "../pages/OrderSummaryPage";
import { MenuPage } from "../pages/MenuPage"
import { MyCartPage } from "../pages/MyCartPage"
import { CheckoutPage } from "../pages/CheckoutPage";

// Instantiation of page object
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

  get menuPage(){
        return new MenuPage(this.page)
  }

  get myCartPage(){
        return new MyCartPage(this.page)
  }

  get checkoutPage(){
        return new CheckoutPage(this.page)
  }
}

setWorldConstructor(CustomWorld);