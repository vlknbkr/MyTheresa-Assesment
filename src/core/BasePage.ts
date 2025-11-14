import { Locator, Page } from "@playwright/test";
import { BASE_SELECTORS } from "../locators/basePage.locators";


export class BasePage {
  private readonly navHome: Locator;
  private readonly navAccount: Locator;
  private readonly navCloting: Locator;
  private readonly navAbout: Locator;
  private readonly navShoppingBag: Locator;
  protected readonly page: Page;


  constructor(page: Page) {
    this.page = page;
    this.navHome = page.locator(BASE_SELECTORS.navHome);
    this.navAccount = page.locator(BASE_SELECTORS.navAccount);
    this.navCloting = page.locator(BASE_SELECTORS.navClothing);
    this.navAbout = page.locator(BASE_SELECTORS.navAbout);
    this.navShoppingBag = page.locator(BASE_SELECTORS.navShoppingBag);
  }

  protected async goto(path: string){
    await this.page.goto(path, {waitUntil:"load"})
  }

  async clickHomeButton() {
    await this.navHome.click();
  }

  async clicAccountButton() {
    await this.navAccount.click();
  }

  async clickClotingButton() {
    await this.navCloting.click();
  }
  async clickAboutButton() {
    await this.navAbout.click();
  }
  async clickShoppingBagButton() {
    await this.navShoppingBag.click();
  }
}