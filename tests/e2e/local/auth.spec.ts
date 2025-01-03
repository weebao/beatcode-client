import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test("(register) happy path", async ({ page }) => {
    const random = Math.floor(10000 + Math.random() * 90000);
    console.log("Generated username:", `test-${random}`);

    // Go to the homepage and ensure it's fully loaded
    await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });

    // Navigate to the "Sign in" page
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.waitForURL("http://localhost:4173/login");

    // Navigate to the "Sign up" page
    await page.getByRole("link", { name: "Sign up" }).click();
    await page.waitForURL("http://localhost:4173/register");

    // Fill out the registration form
    await page.getByPlaceholder("Username").fill(`test-${random}`);
    await page.getByPlaceholder("Display Name").fill(`test-${random}`);
    await page.getByPlaceholder("Email").fill(`test-${random}@gmail.com`);
    await page.getByPlaceholder("Password", { exact: true }).fill("passwords");
    await page.getByPlaceholder("Confirm Password").fill("passwords");

    // Submit the form
    await page.getByRole("button", { name: "Create Account" }).click();

    // Validate navigation to the success page
    await page.waitForURL("http://localhost:4173/register/success");
    await expect(page).toHaveURL("http://localhost:4173/register/success");
});

test("(login) happy path", async ({ page }) => {
    const message =
        "Login not successful. Did you have the user `test` with the password `passwords` registered and verified?";

    // Go to the homepage and ensure it's fully loaded
    await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });

    // Navigate to the "Sign in" page
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.waitForURL("http://localhost:4173/login");

    // Fill out the login form
    await page.getByPlaceholder("Username or Email").fill("test");
    await page.getByPlaceholder("Password").fill("password"); // TODO: @BaoDang: I changed the "passwords" to "password" (by mistake lol so you might not pass this test)

    // Submit the login form
    await page.getByRole("button", { name: "Sign In" }).click();

    // Validate navigation to the home page
    await page.waitForURL("http://localhost:4173/home");
    await expect(page, message).toHaveURL("http://localhost:4173/home");
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
    await page.goto("http://localhost:4173/login", { waitUntil: "domcontentloaded" });

    await page.getByPlaceholder("Username or Email").fill("test");
    await page.getByPlaceholder("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("Incorrect login credentials", { exact: true })).toBeVisible();
});

test("Experience - Navigate to Experience page", async ({ page }) => {
    // Go to the login page and wait for the DOM to load
    await page.goto("http://localhost:4173/login", { waitUntil: "domcontentloaded" });

    // Fill in login credentials
    await page.getByPlaceholder("Username or Email").fill("test");
    await page.getByPlaceholder("Password").fill("password");

    // Click the login button
    await page.getByRole("button", { name: "Sign In" }).click();

    // Wait for the page to navigate to the home/dashboard page
    await page.waitForURL("http://localhost:4173/home", { waitUntil: "domcontentloaded" });

    // Navigate to the "Experience" page by clicking on the navigation link
    await page.getByRole("navigation").getByRole("link").click();

    // Wait for the "Experience" page to load and validate the heading is visible
    await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
});

test("Navigate to Custom Mode after login", async ({ page }) => {
    // Go to the login page and wait for the DOM to load
    await page.goto("http://localhost:4173/login", { waitUntil: "domcontentloaded" });

    // Fill in login credentials
    await page.getByPlaceholder("Username or Email").fill("test");
    await page.getByPlaceholder("Password").fill("password");

    // Click the login button
    await page.getByRole("button", { name: "Sign In" }).click();

    // Wait for the page to navigate to the home/dashboard page
    await page.waitForURL("http://localhost:4173/home", { waitUntil: "domcontentloaded" });

    // Click the "Start" link
    await page.getByRole("link", { name: "Start" }).nth(2).click();

    // Wait for the "Custom Mode" page to load and validate the heading
    await page.waitForURL("http://localhost:4173/custom", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Custom Mode" })).toBeVisible();
});

test("Full workflow: Login, create room, and attempt to start game", async ({ page }) => {
    // Go to the login page and wait for the DOM to load
    await page.goto("http://localhost:4173/login", { waitUntil: "domcontentloaded" });

    // Fill in login credentials
    await page.getByPlaceholder("Username or Email").fill("test");
    await page.getByPlaceholder("Password").fill("password");

    // Select checkbox #bits-1 (if applicable)
    await page.locator("#bits-1").click();

    // Click the login button
    await page.getByRole("button", { name: "Sign In" }).click();

    // Wait for navigation to the home/dashboard page
    await page.waitForURL("http://localhost:4173/home", { waitUntil: "domcontentloaded" });

    // Navigate to the "Custom" section
    await page.getByText("Custom").click();

    // Click the "Start" link
    await page.getByRole("link", { name: "Start" }).nth(2).click();

    // Wait for the room creation page to load
    await page.waitForURL("http://localhost:4173/custom", { waitUntil: "domcontentloaded" });

    // Click "Create New Room"
    await page.getByRole("button", { name: "Create New Room" }).click();

    // Click "Create Room"
    await page.getByRole("button", { name: "Create Room" }).click();

    // Attempt to start the game
    await page.getByRole("button", { name: "Start Game" }).click();

    // Validate the error message is displayed
    await expect(page.getByText("Can't start game without an")).toBeVisible();

    // Verify heading displays the username
    await expect(page.getByRole("heading", { name: "test", exact: true })).toBeVisible();
});
