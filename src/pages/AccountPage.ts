import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/BasePage";
import { LOGIN_SELECTORS } from "../locators/accountPage.locators.ts";
import { RegisterSubclass } from "../core/RegisterSubclass";

@RegisterSubclass("AccountPage")
export class AccountPage extends BasePage {
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly signUpButton: Locator;
    private readonly welcomeMessage: Locator;
    private readonly navAccount: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameInput = page.locator(LOGIN_SELECTORS.userName);
        this.passwordInput = page.locator(LOGIN_SELECTORS.password);
        this.loginButton = page.locator(LOGIN_SELECTORS.loginButton);
        this.signUpButton = page.locator(LOGIN_SELECTORS.signUpButton);
        this.welcomeMessage = page.locator(LOGIN_SELECTORS.welcomeMessage);
        this.navAccount = page.locator(LOGIN_SELECTORS.navAccount)

    }

    /**
     * Overrides BasePage default header click logic.
     * Navigates using the Home button in the header.
     */
    async clickHeaderItem() {
        await this.navAccount.click();
    }

    /**
     * Opens the login page using baseURL from Playwright config.
     */
    async open() {
        await this.goto("login.html");
    }

    /**
     * Fills in username and password fields.
     */
    async fillCredentials(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    /**
     * Clicks the "Login" button.
     */
    async clickLogin() {
        await this.loginButton.click();
    }

    /**
     * Clicks the "Sign Up" button.
     */
    async clickSignUp() {
        await this.signUpButton.click();
    }

    /**
    * is the "Logout" button visible
    */
    async isWelcomeMessageVisible() {
        return await this.welcomeMessage.isVisible();
    }

    /**
     * Performs a full login flow.
     */
    async login(username: string, password: string) {
        await this.open();
        await this.fillCredentials(username, password);
        await this.clickLogin();
    }
}
BasePage.registerSubclass(AccountPage);