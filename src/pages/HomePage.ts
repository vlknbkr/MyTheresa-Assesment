import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { HOME_SELECTORS } from "../locators/homePage.locators";
import { RegisterSubclass } from "../core/RegisterSubclass";

@RegisterSubclass("HomePage")
export class HomePage extends BasePage {
  private readonly shopNowCta: Locator;
  private readonly navHome: Locator;


  constructor(page: Page) {
    super(page);
    this.shopNowCta = page.locator(HOME_SELECTORS.ctaShopNow);
    this.navHome = page.locator(HOME_SELECTORS.navHome)
  }

  /**
   * Overrides BasePage default header click logic.
   * Navigates using the Home button in the header.
   */
  async clickHeaderItem() {
    await this.navHome.click();
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
BasePage.registerSubclass(HomePage);
