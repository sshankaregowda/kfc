import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../support/logger"; 

// This is KFC home page for starting the order
export class HomePage extends BasePage {
  private readonly kfcLogo = this.page.getByTestId("kfc-logo");
  private readonly startOrderButton = this.page.getByRole('button', { name: 'Start Order' });
  private readonly startOrderHeader = this.page.getByRole('heading', { level: 2, name: 'START YOUR ORDER' });

  async verifyHomePage() {
    logger.info("Verifying Home Page loading and URL...");
    
    await expect(this.page).toHaveURL(/kfc/, { timeout: 30000 });
    
    await this.page.waitForLoadState('load');
    
    await expect(this.kfcLogo).toBeVisible();
    logger.info("Home Page verified successfully with KFC Logo visible.");
  }

  async startOrder() {
    logger.info("Attempting to click 'Start Order' button.");
    
    await this.startOrderButton.click();
    
    await expect(this.startOrderHeader).toBeVisible();
    
    logger.info("Order flow initiated successfully.");
  }
}