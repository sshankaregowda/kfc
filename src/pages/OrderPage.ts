import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../support/logger"; 

// This is KFC order page for selecting the order type and search location
export class OrderPage extends BasePage {
  private readonly searchLocationTxtbox = this.page.getByTestId('store-search-input');
  private readonly kfcStoresList = this.page.locator('.selectkfc-card-container');
  private readonly selectStore = this.page.locator('.selectkfc-card-container > div');
  private readonly orderSummaryHeader = this.page.getByText('ORDER SUMMARY');

  async selectOrderType(orderType: string) {
    logger.info(`Selecting order type: ${orderType}`);
    await this.page.getByRole('button', { name: orderType }).click();
  }

  async verifyKFCLocationPageandSearchLocation(location: string, state: string, country: string) {
    logger.info(`Searching for location: ${location}, ${state}, ${country}`);
    
    await expect(this.searchLocationTxtbox).toHaveAttribute("placeholder", "Search by Suburb or Postcode");
    await this.searchLocationTxtbox.fill(location);

    const suggestionRegex = new RegExp(`^${location}\\s+${state},\\s+${country}$`, "i");

    const searchSuggestion = this.page.locator('.suggestion-description', { 
        hasText: suggestionRegex 
    });

    await expect(searchSuggestion).toBeVisible({ timeout: 30000 });
    await searchSuggestion.click();
    
    await expect(this.kfcStoresList).toBeVisible({ timeout: 30000 });
    logger.info("KFC Store list is now visible.");
  }

  async selectStoreAndOrderHere(location: string) {

    const matchingStore = this.selectStore.filter({
      has: this.page.getByTestId("store-name").filter({
        hasText: new RegExp(location, "i")
      })
    }).first();

    const storeNameLocator = matchingStore.getByTestId("store-name");
    
    const storeName = (await storeNameLocator.textContent())?.trim();
    logger.info(`Selected Store Name: "${storeName}"`);

    await matchingStore.getByTestId("schedule-order").click();
    
    await expect(this.orderSummaryHeader).toContainText('ORDER SUMMARY');
    logger.info("Successfully reached the Order Summary Page");
   
    return storeName;
  }
}