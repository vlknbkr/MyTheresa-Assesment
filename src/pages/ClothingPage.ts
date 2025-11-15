import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { CLOTHING_SELECTORS } from "../locators/clothingPage.locators";
import { RegisterSubclass } from "../core/RegisterSubclass";

@RegisterSubclass("ClothingPage")
export class ClothingPage extends BasePage {
    private readonly headerTitle: Locator;
    private readonly productCards: Locator;
    private readonly navClothing: Locator;


    constructor(page: Page) {
        super(page);
        this.headerTitle = page.locator(CLOTHING_SELECTORS.headerTitle);
        this.productCards = page.locator(CLOTHING_SELECTORS.productCards);
        this.navClothing = page.locator(CLOTHING_SELECTORS.navClothing)

    }

    /**
    * Overrides BasePage default header click logic.
    * Navigates using the Home button in the header.
    */
    async clickHeaderItem() {
        await this.navClothing.click();
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

BasePage.registerSubclass(ClothingPage);
