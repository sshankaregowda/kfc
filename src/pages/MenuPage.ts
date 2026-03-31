import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class MenuPage extends BasePage{

    private readonly menuCard = this.page.locator('.pdp-receipt-card')
    private readonly addToOrderBtn = this.page.getByTestId('add-to-cart-handler')

    async selectCategoryAndAddMenuitem(
  category: string,
  menuItem: string,
  expectedCount: string
) {
  const categoryLocator = this.page
    .getByTestId('category-click-test')
    .getByText(category, { exact: true });

  await categoryLocator.waitFor({ state: 'visible', timeout: 15000 });
  await categoryLocator.click();

  const productCard = this.page
    .locator('[data-testid^="click-allow-on-product-"]')
    .filter({
      has: this.page
        .getByTestId('plp-menu-card-header')
        .filter({ hasText: menuItem })
    })
    .first();

  await productCard.waitFor({ state: 'visible', timeout: 20000 });
  await productCard.scrollIntoViewIfNeeded();
  await productCard.click({ timeout: 30000 });

  await expect(this.menuCard).toBeVisible({ timeout: 40000 });
  await this.addToOrderBtn.click();

  const cartCount = this.page.locator('.basket');
  await expect(cartCount).toContainText(String(expectedCount), { timeout: 10000 });
}

}