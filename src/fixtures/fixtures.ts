import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { AccountPage } from "../pages/AccountPage";
import { ClothingPage } from "../pages/ClothingPage";
import { ShoppingCartPage } from "../pages/ShoppingBagPage";

type MyFixtures = {
    homePage: HomePage;
    aboutPage: AboutPage;
    accountPage: AccountPage;
    clothingPage: ClothingPage;
    shoppingBagPage: ShoppingCartPage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    aboutPage: async ({ page }, use) => {
        await use(new AboutPage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    clothingPage: async ({ page }, use) => {
        await use(new ClothingPage(page));
    },
    shoppingBagPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },
});

export { expect } from "@playwright/test";
