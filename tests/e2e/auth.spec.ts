import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test("register happy path", async ({ page }) => {
    const random = Math.floor(10000 + Math.random() * 90000);
    await page.goto("http://localhost:4173/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByRole("link", { name: "Sign up" }).click();
    await page.getByPlaceholder("Username").fill(`test-${random}`);
    await page.getByPlaceholder("Display Name").fill(`test-${random}`);
    await page.getByPlaceholder("Email").fill(`test-${random}@gmail.com`);
    await page.getByPlaceholder("Password", { exact: true }).fill("passwords");
    await page.getByPlaceholder("Confirm Password").fill("passwords");
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page).toHaveURL("http://localhost:4173/register/success");
});

test("login happy path", async ({ page }) => {
    const message =
        "Login not successful. Did you have the user `test` with the password `passwords` registered and verified?";
    await page.goto("http://localhost:4173/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByPlaceholder("Username or Email").fill("test");
    await page.getByPlaceholder("Password").fill("passwords");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page, message).toHaveURL("http://localhost:4173/home");
});
