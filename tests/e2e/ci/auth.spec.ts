import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test("(register) password must be at least 8 characters", async ({ page }) => {
    const random = Math.floor(10000 + Math.random() * 90000);
    await page.goto("http://localhost:4173/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByRole("link", { name: "Sign up" }).click();
    await page.getByPlaceholder("Username").fill(`test-${random}`);
    await page.getByPlaceholder("Display Name").fill(`test-${random}`);
    await page.getByPlaceholder("Email").fill(`test-${random}@gmail.com`);
    await page.getByPlaceholder("Password", { exact: true }).fill("1");
    await page.getByPlaceholder("Confirm Password").fill("1");
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(
        page.getByText("Password must be at least 8 characters", { exact: true })
    ).toBeVisible();
});

test("(register) password and confirm password must match", async ({ page }) => {
    const random = Math.floor(10000 + Math.random() * 90000);
    await page.goto("http://localhost:4173/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByRole("link", { name: "Sign up" }).click();
    await page.getByPlaceholder("Username").fill(`test-${random}`);
    await page.getByPlaceholder("Display Name").fill(`test-${random}`);
    await page.getByPlaceholder("Email").fill(`test-${random}@gmail.com`);
    await page.getByPlaceholder("Password", { exact: true }).fill("passwords");
    await page.getByPlaceholder("Confirm Password").fill("passwordss");
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page.getByText("Passwords do not match", { exact: true })).toBeVisible();
});
