import { Locator, Page } from "@playwright/test";
import { PageRegistry } from "./RegisterSubclass";

export class BasePage {
  protected readonly page: Page;
  static subclasses: Function[] = [];

  constructor(page: Page) {
    this.page = page;
  }
  static registerSubclass(subclass: Function) {
    BasePage.subclasses.push(subclass);
  }

  /**
   * Subclasses should override this to implement header navigation behavior.
   */
  async clickHeaderItem(_elementKey: string) {
    throw new Error("clickHeaderElement() must be overridden in the subclass");
  }

  static create(pageName: string, page: Page) {
    const PageClass = PageRegistry[pageName];
    if (!PageClass) {
      throw new Error(`Page "${pageName}" is not registered in PageRegistry.`);
    }
    return new PageClass(page);
  }

  protected async goto(path: string) {
    await this.page.goto(path, { waitUntil: "load" })
  }
}