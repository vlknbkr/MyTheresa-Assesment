import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { CLOTHING_SELECTORS } from "../locators/clothingPage.locators";
import { RegisterSubclass } from "../core/RegisterSubclass";

@RegisterSubclass("ClothingPage")
export class ClothingPage extends BasePage {
    private readonly productCards: Locator;
    private readonly navClothing: Locator;


    constructor(page: Page) {
        super(page);
        this.productCards = page.locator(CLOTHING_SELECTORS.productCards);
        this.navClothing = page.locator(CLOTHING_SELECTORS.navClothing)

    }

    /**
    * Overrides BasePage default header click logic.
    * Navigates using the Home button in the header.
    */
    async clickHeaderItem() {
        this.navClothing.click();
    }

    /**
     * Opens the clothing page using baseURL from Playwright config.
     */
    async open() {
        this.goto("clothing.html");
    }

    /**
     * Returns visible product count
     */
    async getProductCount() {
        return this.productCards.count();
    }
}

BasePage.registerSubclass(ClothingPage);
