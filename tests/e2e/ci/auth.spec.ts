import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test("(register) password must be at least 8 characters", async ({ page }) => {
    const random = Math.floor(10000 + Math.random() * 90000);

    // Go to the initial URL and wait for the page to be fully loaded
    await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });

    // Click "Sign in" and wait for the URL to change
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.waitForURL("http://localhost:4173/login");

    // Click "Sign up" and wait for the URL to change
    await page.getByRole("link", { name: "Sign up" }).click();
    await page.waitForURL("http://localhost:4173/register");

    // Ensure the page is fully loaded
    await page.waitForLoadState("domcontentloaded");

    // Fill in the form fields
    await page.getByPlaceholder("Username").fill(`test-${random}`);
    await page.getByPlaceholder("Display Name").fill(`test-${random}`);
    await page.getByPlaceholder("Email").fill(`test-${random}@gmail.com`);
    await page.getByPlaceholder("Password", { exact: true }).fill("1");
    await page.getByPlaceholder("Confirm Password").fill("1");

    // Click the "Create Account" button
    await page.getByRole("button", { name: "Create Account" }).click();

    // Verify that the error message is visible
    await expect(
        page.getByText("Password must be at least 8 characters", { exact: true })
    ).toBeVisible();
});

test("(register) password and confirm password must match", async ({ page }) => {
    const random = Math.floor(10000 + Math.random() * 90000);

    // Go to the initial URL and wait for the page to load
    await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });

    // Click "Sign in" and wait for navigation
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.waitForURL("http://localhost:4173/login");

    // Click "Sign up" and wait for navigation
    await page.getByRole("link", { name: "Sign up" }).click();
    await page.waitForURL("http://localhost:4173/register");

    // Ensure the registration page is fully loaded
    await page.waitForLoadState("domcontentloaded");

    // Fill in the form fields with mismatched passwords
    await page.getByPlaceholder("Username").fill(`test-${random}`);
    await page.getByPlaceholder("Display Name").fill(`test-${random}`);
    await page.getByPlaceholder("Email").fill(`test-${random}@gmail.com`);
    await page.getByPlaceholder("Password", { exact: true }).fill("passwords");
    await page.getByPlaceholder("Confirm Password").fill("passwordss");

    // Click the "Create Account" button
    await page.getByRole("button", { name: "Create Account" }).click();

    // Verify the error message for mismatched passwords is visible
    await expect(page.getByText("Passwords do not match", { exact: true })).toBeVisible();
});

test("Registration - Username must not exceed 20 characters", async ({ page }) => {
    await page.goto("http://localhost:4173/register", { waitUntil: "networkidle" });

    // Fill out the form with an excessively long username
    await page.getByPlaceholder("Username").fill("c".repeat(300));
    await page.getByPlaceholder("Display Name").fill("Valid Display Name");
    await page.getByPlaceholder("Email").fill("valid@gmail.com");
    await page.getByPlaceholder("Password", { exact: true }).fill("password123");
    await page.getByPlaceholder("Confirm Password").fill("password123");

    // Submit the form
    await page.getByRole("button", { name: "Create Account" }).click();

    // Validate the error message
    await expect(
        page.getByText("Username must be at most 20 characters", { exact: true })
    ).toBeVisible();
});

test("Registration - Display Name must not exceed 50 characters", async ({ page }) => {
    await page.goto("http://localhost:4173/register", { waitUntil: "domcontentloaded" });

    // Fill out the form with an excessively long display name
    await page.getByPlaceholder("Username").fill("validUser");
    await page.getByPlaceholder("Display Name").fill("a".repeat(300));
    await page.getByPlaceholder("Email").fill("valid@gmail.com");
    await page.getByPlaceholder("Password", { exact: true }).fill("password123");
    await page.getByPlaceholder("Confirm Password").fill("password123");

    // Submit the form
    await page.getByRole("button", { name: "Create Account" }).click();

    // Validate the error message
    await expect(
        page.getByText("Display name must be at most 50 characters", { exact: true })
    ).toBeVisible();
});

test("Registration - Invalid email formats", async ({ page }) => {
    const invalidEmails = ["vl@com", "vl@gmail", "vl@gmail.c"];
    for (const email of invalidEmails) {
        await page.goto("http://localhost:4173/register", { waitUntil: "networkidle" });

        await page.getByPlaceholder("Username").fill("validUser");
        await page.getByPlaceholder("Display Name").fill("Valid Display Name");
        await page.getByPlaceholder("Email").fill(email);
        await page.getByPlaceholder("Password", { exact: true }).fill("password123");
        await page.getByPlaceholder("Confirm Password").fill("password123");

        await page.getByRole("button", { name: "Create Account" }).click();

        await expect(
            page.getByText("Please enter a valid email address", { exact: true })
        ).toBeVisible();
    }
});

test("Registration - Password and Confirm Password must match", async ({ page }) => {
    await page.goto("http://localhost:4173/register", { waitUntil: "domcontentloaded" });

    await page.getByPlaceholder("Username").fill("validUser");
    await page.getByPlaceholder("Display Name").fill("Valid Display Name");
    await page.getByPlaceholder("Email").fill("valid@gmail.com");
    await page.getByPlaceholder("Password", { exact: true }).fill("password123");
    await page.getByPlaceholder("Confirm Password").fill("password124");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Passwords do not match", { exact: true })).toBeVisible();
});

test("Login - Valid username/email with incorrect password", async ({ page }) => {
  try {
      // Step 1: Navigate to the login page
      await page.goto("http://localhost:4173/login", { waitUntil: "networkidle" });

      // Step 2: Fill in the login form with test credentials
      await page.getByPlaceholder("Username or Email").fill("test");
      await page
          .getByPlaceholder("Password")
          .fill("caiditconmemaythangnaodatmatkhaunaydambomevaomom");
      await page.getByRole('button', { name: 'Sign In' }).click();

      // Step 4: Verify that the "Don't have an account yet?" element is visible
      await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
      // await expect(page.getByText("Don\'t have an account yet?", { exact: true })).toBeVisible();

      // Step 5: Verify the incorrect credentials error message
    //   console.log("minhdz vl", page.getByText("Incorrect login credentials", { exact: true }));
      await expect(page.getByText("Incorrect login credentials", { exact: true })).toBeVisible();
  } catch (error) {
      // Capture debugging information if the test fails
      console.log("Error encountered during the test execution:", error);

      // Capture a screenshot of the failure
      await page.screenshot({ path: "debug-failure.png", fullPage: true });

      // Log the page content to help with debugging
      console.log("Page content at failure:\n", await page.content());

      // Re-throw the error after capturing debugging information
      throw error;
  }
});