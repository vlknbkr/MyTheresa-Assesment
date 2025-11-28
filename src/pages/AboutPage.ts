import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { ABOUT_SELECTORS } from "../locators/aboutPage.locators";
import { RegisterSubclass } from "../core/RegisterSubclass";

@RegisterSubclass("AboutPage")
export class AboutPage extends BasePage {
  private readonly navAbout: Locator;

  constructor(page: Page) {
    super(page);
    this.navAbout = page.locator(ABOUT_SELECTORS.navAbout)

  }

  /**
   * Overrides BasePage default header click logic.
   * Navigates using the Home button in the header.
   */
  async clickHeaderItem() {
    await this.navAbout.click();
  }
  /**
   * Opens the About page using baseURL from Playwright config.
   */
  async open() {
    await this.goto("about.html");
  }


}
BasePage.registerSubclass(AboutPage);