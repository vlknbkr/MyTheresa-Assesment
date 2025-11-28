import { test as base, Page, APIRequestContext } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { AccountPage } from "../pages/AccountPage";
import { ClothingPage } from "../pages/ClothingPage";
import { ShoppingCartPage } from "../pages/ShoppingBagPage";
import { GithubPrService } from "../services/githubPrService";

// 1. Define the type for our fixtures
type MyFixtures = {
    homePage: HomePage;
    aboutPage: AboutPage;
    accountPage: AccountPage;
    clothingPage: ClothingPage;
    shoppingBagPage: ShoppingCartPage;
    githubPrService: GithubPrService;
};

// 2. Extend the base test to create the fixtures
export const test = base.extend<MyFixtures>({
    homePage: async ({ page }: { page: Page }, use) => {
        await use(new HomePage(page));
    },
    aboutPage: async ({ page }: { page: Page }, use) => {
        await use(new AboutPage(page));
    },
    accountPage: async ({ page }: { page: Page }, use) => {
        await use(new AccountPage(page));
    },
    clothingPage: async ({ page }: { page: Page }, use) => {
        await use(new ClothingPage(page));
    },
    shoppingBagPage: async ({ page }: { page: Page }, use) => {
        await use(new ShoppingCartPage(page));
    },
    githubPrService: async ({ request }: { request: APIRequestContext }, use) => {
        await use(new GithubPrService(request));
    },
});

export { expect } from "@playwright/test";
