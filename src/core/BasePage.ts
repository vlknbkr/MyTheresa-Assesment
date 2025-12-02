import { Page } from "@playwright/test";


export class BasePage {
  protected readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Subclasses should override this to implement header navigation behavior.
   */
  async clickHeaderItem(_elementKey?: string) {
    throw new Error("clickHeaderElement() must be overridden in the subclass");
  }

  async open() {
    throw new Error("open() must be overridden in the subclass");
  }

  protected async goto(path: string) {
    await this.page.goto(path, { waitUntil: "load" })
  }
}