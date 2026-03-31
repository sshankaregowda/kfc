import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/CustomWorld";

Given("the user is in KFC website and starts to order", async function (this: CustomWorld) {
  await this.homePage.verifyHomePage();
  await this.homePage.startOrder();
});

When(
  'the user selects order type as {string} order and searches for location {string} with state as {string} and country as {string}',
  async function (
    this: CustomWorld,
    orderType: string,
    location: string,
    state: string,
    country: string
  ) {
    await this.orderPage.selectOrderType(orderType);
    await this.orderPage.verifyKFCLocationPageandSearchLocation(location, state, country);
  }
);

When(
  'the user selects the store for ordering near to {string}',
  async function (this: CustomWorld, location: string) {
    this.storeName = await this.orderPage.selectStoreAndOrderHere(location);
  }
);

When(
  'the user verifies the order summary for {string}',
  async function (this: CustomWorld, orderType: string) {
    await this.orderSummaryPage.verifyOrderSummary(orderType, this.storeName!);
  }
);

When(
  'the user selects category {string} and adds item {string} with quantity {string} to the cart',
  async function (this: CustomWorld, category: string, item: string, quantity: string) {
    await this.menuPage.selectCategoryAndAddMenuitem(category, item, quantity);
  }
);

When(
  'the user verifies the item {string} with quantity {string} in My Cart section',
  async function (this: CustomWorld, menuItem: string, count: string) {
    await this.myCartPage.verifyMyCartPage(menuItem, count);
  }
);

When(
  'the user proceeds to checkout and order summary should be displayed',
  async function (this: CustomWorld) {
    await this.myCartPage.clickCheckoutAndWaitForScreen();
  }
);

When('the user adds payment method', async function (this: CustomWorld) {
  await this.checkoutPage.verifyAndAddPayment();
});

Then(
  'the user should be able to see the order summary with correct item and price details',
  async function (this: CustomWorld) {
    await this.checkoutPage.verifyOrderSuccess();
  }
);