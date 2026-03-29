import { test, expect } from "@playwright/test";

test.describe("PromoModal", () => {
  test("modal appears after page load delay", async ({ page }) => {
    await page.goto("/");
    const modal = page.locator('div[role="dialog"]');
    // Modal should not be visible immediately
    await expect(modal).not.toBeVisible();
    // Wait for the 1500ms timer + animation
    await expect(modal).toBeVisible({ timeout: 5000 });
    await expect(modal.locator("text=Book a Free Shooting")).toBeVisible();
  });

  test("closes on X button click", async ({ page }) => {
    await page.goto("/");
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    await modal.locator('button[aria-label="Close promotional offer"]').dispatchEvent("click");
    await expect(modal).not.toBeVisible();
  });

  test('fills and submits → sees "You\'re Booked!"', async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      }),
    );

    await page.goto("/");
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    await modal.locator('input[name="firstName"]').fill("Jane");
    await modal.locator('input[name="lastName"]').fill("Doe");
    await modal.locator('input[name="email"]').fill("jane@example.com");
    await modal.locator('input[name="phoneNumber"]').fill("5551234567");

    await modal.locator('button[type="submit"]').click();

    await expect(modal.locator("text=You're Booked!")).toBeVisible();
  });

  test("closes on backdrop click", async ({ page }) => {
    await page.goto("/");
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Click the backdrop area below the modal content
    const viewport = page.viewportSize();
    if (!viewport) throw new Error("No viewport");
    await page.mouse.click(10, viewport.height - 10);

    await expect(modal).not.toBeVisible();
  });
});
