import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { CART_SELECTORS } from "../locators/shoppingCartPage.locators";

export class ShoppingCartPage extends BasePage {
    private readonly checkoutButton: Locator;
    private readonly navShoppingBag: Locator;


    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.locator(CART_SELECTORS.checkoutButton);
        this.navShoppingBag = page.locator(CART_SELECTORS.navShoppingBag)

    }

    /**
     * Overrides BasePage default header click logic.
     * Navigates using the Home button in the header.
     */
    async clickHeaderItem() {
        await this.navShoppingBag.click();
    }

    /**
     * Opens the cart page using baseURL from Playwright config.
     */
    async open() {
        await this.goto("cart.html");
    }
}
