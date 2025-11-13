import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { ABOUT_SELECTORS } from "../locators/aboutPage.locators";

export class AboutPage extends BasePage {
  private readonly headerTitle: Locator;
  private readonly contentContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator(ABOUT_SELECTORS.headerTitle);
    this.contentContainer = page.locator(ABOUT_SELECTORS.contentContainer);
  }

  /**
   * Opens the About page using baseURL from Playwright config.
   */
  async open() {
    await this.goto("about.html");
  }

  /**
   * Returns the main heading text of the About page.
   */
  async getHeaderText(){
    const header = this.headerTitle.first();
    if (await header.isVisible()) {
      return header.textContent();
    }
    return null;
  }

  /**
   * Basic visibility check to ensure About page content is rendered.
   */
  async isContentVisible() {
    return this.contentContainer.first().isVisible();
  }

  async getPageTitle(){
    return "about page"
  }
}