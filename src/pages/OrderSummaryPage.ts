import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class OrderSummaryPage extends BasePage {
    private readonly orderTypeLbl = this.page.getByRole('heading', { level: 3, name: 'ORDER TYPE' }).locator('..').getByTestId('store-store-name')
    private readonly kfcRestaurantLbl = this.page.getByRole('heading', { level: 3, name: 'YOUR KFC RESTAURANT' }).locator('..').getByTestId('store-store-name')
    private readonly viewMenuBtn = this.page.getByRole('button', { name: 'View Menu'})

    


async verifyOrderSummary(orderType: string, restaurantName: string){
await expect(this.orderTypeLbl).toContainText(orderType)
await expect(this.kfcRestaurantLbl).toContainText(restaurantName)
await this.viewMenuBtn.click()

  }
}