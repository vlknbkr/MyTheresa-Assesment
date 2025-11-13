import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HOME_SELECTORS } from "../locators/homePage.locators";

export class HomePage extends BasePage {
  private readonly shopNowCta: Locator;

  constructor(page: Page) {
    super(page);
    this.shopNowCta = page.locator(HOME_SELECTORS.ctaShopNow);
  }

  /**
   * Opens the homepage using the baseURL from Playwright config.
   */
  async open() {
    await this.goto("");
  }

  /**
   * Clicks the "Shop Now" CTA button on the homepage.
   */
  async clickShopNowCta() {
    await this.shopNowCta.click();
  }

  /**
   * Returns all anchor links on the homepage.
   */
  async getAllLinks() {
    await this.open();
    return this.page.$$eval(HOME_SELECTORS.allLinks, (anchors) =>
      anchors.map((a) => (a as HTMLAnchorElement).href)
    );
  }
}