export const LOGIN_SELECTORS = {
  navAccount: 'a:has-text("Account")',
  userName: "input[name='username']",
  password: "input[type='password']",
  loginButton: "input[type='submit']",
  errorMessage: ".error-message",
  signUpButton: "//a[normalize-space(text())='Sign up']",
  welcomeMessage: "//h2[normalize-space(text())='Welcome, testUser!']"
};