import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { userData } from "../test/data/userData";
import { logger } from "../support/logger"; 

// This is KFC checkout page to add payment details and proceed to successful ordering
export class CheckoutPage extends BasePage {
  private readonly continueAsGuestBtn = this.page.getByTestId('continue-as-a-gust');
  private readonly firstNameInput = this.page.getByTestId('enter-firstName-details');
  private readonly lastNameInput = this.page.getByTestId('enter-lastName-details');
  private readonly emailInput = this.page.getByTestId('enter-email-details');
  private readonly phoneInput = this.page.getByTestId('enter-phoneNumber-details');
  private readonly addPaymentBtn = this.page.getByTestId('pay-button');

  // iFrame Locators
  private readonly cardNumberFrame = this.page.frameLocator('iframe[title="Iframe for card number"]');
  private readonly expiryDateFrame = this.page.frameLocator('iframe[title="Iframe for expiry date"]');
  private readonly securityCodeFrame = this.page.frameLocator('iframe[title="Iframe for security code"]');

  private readonly payBtn = this.page.locator('button.adyen-checkout__button--pay');
  private readonly orderReceivedMessage = this.page.locator('.statusMessage');

  async verifyAndAddPayment() {
    logger.info("Starting guest checkout flow.");
    await expect(this.continueAsGuestBtn).toBeVisible({ timeout: 10000 });
    await this.continueAsGuestBtn.click();

    await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
    await expect(this.addPaymentBtn).toBeDisabled();

    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.emailInput.fill(userData.email);
    await this.phoneInput.fill(userData.phone);

    logger.info("Contact details filled. Proceeding to payment section.");
    await expect(this.addPaymentBtn).toBeEnabled({ timeout: 10000 });
    await this.addPaymentBtn.click();

    // Scrolling to ensure frames are interactable
    await this.page.mouse.wheel(0, 1200);

    // Encrypted Field Locators
    const cardNumberInput = this.cardNumberFrame.locator('input[data-fieldtype="encryptedCardNumber"]');
    const expiryDateInput = this.expiryDateFrame.locator('input[data-fieldtype="encryptedExpiryDate"]');
    const securityCodeInput = this.securityCodeFrame.locator('input[data-fieldtype="encryptedSecurityCode"]');

    await expect(cardNumberInput).toBeVisible({ timeout: 20000 });
    await cardNumberInput.click();
    await cardNumberInput.fill(userData.cardNumber);

    await expect(expiryDateInput).toBeVisible({ timeout: 10000 });
    await expiryDateInput.click();
    await expiryDateInput.fill(userData.expiryDate);

    await expect(securityCodeInput).toBeVisible({ timeout: 10000 });
    await securityCodeInput.click();
    await securityCodeInput.fill(userData.cvv);

    logger.info("Attempting final payment");
    await expect(this.payBtn).toBeEnabled({ timeout: 10000 });
    await this.payBtn.click();
  }

  async verifyOrderSuccess() {
    logger.info("Waiting for 'Order Received' confirmation screen.");
    
    await expect(this.orderReceivedMessage).toBeVisible({ timeout: 30000 });
    await expect(this.orderReceivedMessage).toContainText(/ORDER RECEIVED/i, { timeout: 30000 });

    logger.info(`Verifying confirmation message for user: ${userData.firstName}`);
    await expect(this.page.getByText(new RegExp(userData.firstName, 'i'))).toBeVisible({
      timeout: 30000,
    });

    logger.info("Order successfully verified!");
  }
}