import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../support/logger"; 

// This is KFC orderSummary page to verify the order summary details
export class OrderSummaryPage extends BasePage {
    private readonly orderTypeLbl = this.page.getByRole('heading', { level: 3, name: 'ORDER TYPE' }).locator('..').getByTestId('store-store-name');
    private readonly kfcRestaurantLbl = this.page.getByRole('heading', { level: 3, name: 'YOUR KFC RESTAURANT' }).locator('..').getByTestId('store-store-name');
    private readonly viewMenuBtn = this.page.getByRole('button', { name: 'View Menu'});

    async verifyOrderSummary(orderType: string, restaurantName: string) {
        
        // 1. Verify Order Type
        logger.info(`Checking if Order Type matches: "${orderType}"`);
        await expect(this.orderTypeLbl).toContainText(orderType);
        
        // 2. Verify Restaurant Name
        logger.info(`Checking if KFC Restaurant matches: "${restaurantName}"`);
        await expect(this.kfcRestaurantLbl).toContainText(restaurantName);

        // 3. Navigate to Menu
        logger.info("Validation successful. Clicking 'View Menu' to proceed.");
        await this.viewMenuBtn.click();

        await expect(this.page).toHaveURL(/menu/);
        logger.info("Successfully navigated to the Menu page.");
    }
}