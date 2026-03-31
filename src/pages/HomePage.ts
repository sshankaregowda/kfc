import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

  private readonly kfcLogo = this.page.getByTestId("kfc-logo")
  private readonly startOrderButton = this.page.getByRole('button',{name: 'Start Order'})
  private readonly startOrderHeader = this.page.getByRole('heading', { level: 2, name: 'START YOUR ORDER' })

  async verifyHomePage() {
    await expect(this.page).toHaveURL(/kfc/, {timeout : 30000})
    await this.page.waitForLoadState('load');
    await expect(this.kfcLogo).toBeVisible()
  }

  async startOrder(){
    await this.startOrderButton.click()
    await expect(this.startOrderHeader).toBeVisible()
  }
}