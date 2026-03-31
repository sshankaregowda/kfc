import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../support/logger"; // Path to your winston logger

// This is KFC My cart page which validates the added items in the cart
export class MyCartPage extends BasePage {
  private readonly basketIcon = this.page.locator('button.basket-link');
  private readonly cartItems = this.page.getByTestId('cart-food-item-test');
  private readonly cartCount = this.page.getByTestId('cart-count');
  private readonly cartItemName = this.page.locator('.cart-food-card-item-name');
  private readonly checkoutBtn = this.page.getByTestId('navigation-checkout-desktop');
  private readonly checkoutPage = this.page.getByTestId('checkout-page');

  async verifyMyCartPage(menuItem: string, expectedCount: string) {
    await this.basketIcon.click();

    const countRegex = new RegExp(`${expectedCount}\\s*item(s)?`, 'i');
    logger.info(`Verifying cart count matches: ${expectedCount} (Regex: ${countRegex})`);
    
    await expect(this.cartCount).toHaveText(countRegex);

    await expect(this.cartItems).toHaveCount(Number(expectedCount));

    logger.info(`Checking if cart contains the expected item: "${menuItem}"`);
    await expect(this.cartItemName).toContainText(menuItem);
    
    logger.info("Cart page verification complete.");
  }

  async clickCheckoutAndWaitForScreen() {
    logger.info("Proceeding to Checkout.");
    
    await this.checkoutBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.checkoutBtn.click();

    await expect(this.checkoutPage).toBeVisible({ timeout: 20000 });
    
    logger.info("Checkout page is visible");
  }
}