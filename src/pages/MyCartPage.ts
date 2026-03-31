import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class MyCartPage extends BasePage {
  private readonly basketIcon = this.page.locator('button.basket-link');
  private readonly cartItems = this.page.getByTestId('cart-food-item-test');
  private readonly cartCount = this.page.getByTestId('cart-count');
  private readonly cartItemName = this.page.locator('.cart-food-card-item-name');
  private readonly checkoutBtn = this.page.getByTestId('navigation-checkout-desktop');
  private readonly checkoutPage = this.page.getByTestId('checkout-page');

  async verifyMyCartPage(menuItem: string, expectedCount: string) {
    await this.basketIcon.click();

    await expect(this.cartCount).toHaveText(
      new RegExp(`${expectedCount}\\s*item(s)?`, 'i')
    );

    await expect(this.cartItems).toHaveCount(Number(expectedCount));

    await expect(this.cartItemName).toContainText(menuItem);
  }

  async clickCheckoutAndWaitForScreen() {
    await this.checkoutBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.checkoutBtn.click();

    await expect(this.checkoutPage).toBeVisible({ timeout: 20000 });
  }
}