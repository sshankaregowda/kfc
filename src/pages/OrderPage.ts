import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class OrderPage extends BasePage {
    private readonly searchLocationTxtbox = this.page.getByTestId('store-search-input')
    private readonly kfcStoresList = this.page.locator('.selectkfc-card-container')
    private readonly selectStore = this.page.locator('.selectkfc-card-container > div')
    private readonly orderSummaryHeader = this.page.getByText('ORDER SUMMARY')


  async selectOrderType(orderType: string){
    await this.page.getByRole('button',{name:orderType}).click()
  }

  async verifyKFCLocationPageandSearchLocation(location: string, state: string, country: string){
    await expect(this.searchLocationTxtbox).toHaveAttribute("placeholder","Search by Suburb or Postcode");
    await this.searchLocationTxtbox.fill(location)
    const searchSuggestion = this.page.locator('.suggestion-description', {hasText: new RegExp(`^${location}\\s+${state},\\s+${country}$`, "i")});

    await expect(searchSuggestion).toBeVisible({timeout: 30000});
    await searchSuggestion.click();
    await expect(this.kfcStoresList).toBeVisible({timeout: 30000});
  }

  async selectStoreAndOrderHere(location: string){

    const matchingStore = this.selectStore.filter({
    has: this.page.getByTestId("store-name").filter({
      hasText: new RegExp(location, "i")
    })
  }).first();

  const storeNameLocator = matchingStore.getByTestId("store-name");

  const storeName = (await storeNameLocator.textContent())?.trim()

  await matchingStore.getByTestId("schedule-order").click()
  await expect(this.orderSummaryHeader).toContainText('ORDER SUMMARY')
   
  return storeName

}

}