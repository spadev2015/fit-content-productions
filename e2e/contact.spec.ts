import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("scrolls to contact section and sees form", async ({ page }) => {
    await page.locator('a[href="#contact"]').first().click();
    const section = page.locator("#contact");
    await expect(section).toBeInViewport();
    await expect(section.locator("h2")).toHaveText("Book a Shoot");
    await expect(section.locator("form")).toBeVisible();
  });

  test("fills and submits form → sees success message", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      }),
    );

    const form = page.locator("#contact form");
    await form.scrollIntoViewIfNeeded();

    await form.locator('input[name="firstName"]').fill("Jane");
    await form.locator('input[name="lastName"]').fill("Doe");
    await form.locator('input[name="email"]').fill("jane@example.com");
    await form.locator('select[name="service"]').selectOption("Video Production");
    await form.locator('textarea[name="message"]').fill("Test message");

    await form.locator('button[type="submit"]').click();

    await expect(page.locator("text=Request Submitted!")).toBeVisible();
    await expect(form).not.toBeVisible();
  });

  test("shows error when API returns failure", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ success: false, error: "Invalid email address" }),
      }),
    );

    const form = page.locator("#contact form");
    await form.scrollIntoViewIfNeeded();

    await form.locator('input[name="firstName"]').fill("Jane");
    await form.locator('input[name="email"]').fill("jane@example.com");
    await form.locator('select[name="service"]').selectOption("Other");

    await form.locator('button[type="submit"]').click();

    await expect(page.locator("text=Invalid email address")).toBeVisible();
    await expect(form).toBeVisible();
  });

  test('shows "Submitting..." during submission', async ({ page }) => {
    // Delay the API response so we can observe the loading state
    await page.route("/api/contact", async (route) => {
      await new Promise((r) => setTimeout(r, 1000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    const form = page.locator("#contact form");
    await form.scrollIntoViewIfNeeded();

    await form.locator('input[name="firstName"]').fill("Jane");
    await form.locator('input[name="email"]').fill("jane@example.com");
    await form.locator('select[name="service"]').selectOption("Other");

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();

    await expect(submitBtn).toContainText("Submitting...");
    await expect(submitBtn).toBeDisabled();

    // Wait for success to confirm the flow completes
    await expect(page.locator("text=Request Submitted!")).toBeVisible();
  });
});
