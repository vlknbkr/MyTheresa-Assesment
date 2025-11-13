import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { CLOTHING_SELECTORS } from "../locators/clothingPage.locators";

export class ClothingPage extends BasePage {
    private readonly headerTitle: Locator;
    private readonly productCards: Locator;

    constructor(page: Page) {
        super(page);
        this.headerTitle = page.locator(CLOTHING_SELECTORS.headerTitle);
        this.productCards = page.locator(CLOTHING_SELECTORS.productCards);
    }

    /**
     * Opens the clothing page using baseURL from Playwright config.
     */
    async open() {
        await this.goto("clothing.html");
    }

    /**
     * Returns visible product count
     */
    async getProductCount() {
        return await this.productCards.count();
    }

    /**
     * Returns the title text of the page
     */
    async getHeaderText() {
        const el = this.headerTitle.first();
        if (await el.isVisible()) {
            return el.textContent();
        }
        return null;
    }
}