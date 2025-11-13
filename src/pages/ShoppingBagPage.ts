import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { CART_SELECTORS } from "../locators/ShoppingCartPage.locators";

export class ShoppingCartPage extends BasePage {
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.locator(CART_SELECTORS.checkoutButton);
    }

    /**
     * Opens the cart page using baseURL from Playwright config.
     */
    async open() {
        await this.goto("cart.html");
    }

    /** 
    * Attempt to proceed to checkout  
    */
    async proceedToCheckout() {
        await this.checkoutButton.first().click();
    }
}