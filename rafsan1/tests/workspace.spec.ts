import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Unlock panel", exact: true }),
  ).toBeVisible();
  await page.waitForTimeout(600);
});

test("requires the right password without locking the background", async ({
  page,
}) => {
  await page.getByLabel("Access key", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "Unlock panel", exact: true }).click();
  await expect(page.locator(".password-error")).toContainText(
    "not quite right",
  );
  await expect(page.getByLabel("Access key", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page
    .getByRole("button", { name: "Increase stake", exact: true })
    .click();
  await expect(page.getByLabel("Stake amount")).toHaveValue("110");
  await page.getByLabel("Access key", { exact: true }).fill("big");
  await page
    .getByRole("button", { name: "Show access key", exact: true })
    .click();
  await expect(page.getByLabel("Access key", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  await page.getByRole("button", { name: "Unlock panel", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Simulate a flight", exact: true }),
  ).toBeVisible();
});

test("drags, minimizes, and stays in the viewport after expanding", async ({
  page,
  isMobile,
}) => {
  const panel = page.locator(".floating-panel");
  const header = page.locator(".panel-header");
  const start = (await panel.boundingBox())!;
  await header.focus();
  await header.press("ArrowLeft");
  expect((await panel.boundingBox())!.x).toBeLessThan(start.x);
  await page
    .getByRole("button", { name: "Minimize panel", exact: true })
    .click();
  await page.waitForTimeout(450);
  expect((await panel.boundingBox())!.height).toBeLessThan(110);
  if (!isMobile) {
    const handle = (await header.boundingBox())!;
    await page.mouse.move(handle.x + 110, handle.y + 24);
    await page.mouse.down();
    await page.mouse.move(handle.x - 100, 840, { steps: 12 });
    await page.mouse.up();
  } else {
    await header.focus();
    for (let index = 0; index < 18; index++)
      await header.press("Shift+ArrowDown");
  }
  await page.getByRole("button", { name: "Expand panel", exact: true }).click();
  await page.waitForTimeout(700);
  const end = (await panel.boundingBox())!;
  expect(end.y).toBeGreaterThanOrEqual(10);
  expect(end.y + end.height).toBeLessThanOrEqual(
    page.viewportSize()!.height - 10,
  );
});

test("hides, reopens, and relocks the panel", async ({ page }) => {
  await page.getByLabel("Access key", { exact: true }).fill("big");
  await page.getByRole("button", { name: "Unlock panel", exact: true }).click();
  await page.getByRole("button", { name: "Hide panel", exact: true }).click();
  await expect(page.locator(".floating-panel")).toHaveCount(0);
  await page.getByRole("button", { name: /Open your flight deck/ }).click();
  await page.getByRole("button", { name: "Lock panel", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Unlock panel", exact: true }),
  ).toBeVisible();
});

test("runs local simulations and stores recent results", async ({ page }) => {
  await page.getByLabel("Access key", { exact: true }).fill("big");
  await page.getByRole("button", { name: "Unlock panel", exact: true }).click();
  await page.getByRole("button", { name: "Fast", exact: true }).click();
  for (let index = 0; index < 2; index++) {
    await page
      .getByRole("button", { name: "Simulate a flight", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Preparing flight", exact: true }),
    ).toBeDisabled();
    await expect(
      page.locator(".panel-recent-values > span:not(.no-flights)"),
    ).toHaveCount(index + 1);
  }
  const value = Number.parseFloat(
    (await page.locator(".mini-flight-number").textContent())!,
  );
  expect(value).toBeGreaterThanOrEqual(1.01);
  expect(value).toBeLessThanOrEqual(12.5);
  await expect(page.locator(".simulation-warning")).toContainText(
    "Cannot predict real game outcomes",
  );
});

test("has functional motion and sound preferences", async ({ page }) => {
  await page
    .getByRole("button", { name: "Panel preferences", exact: true })
    .click();
  const motion = page.getByRole("switch", {
    name: "Motion effects",
    exact: true,
  });
  await motion.click();
  await expect(motion).toHaveAttribute("aria-checked", "false");
  await expect(page.locator(".app-shell")).toHaveClass(/motion-paused/);
  const sound = page.getByRole("switch", {
    name: "Flight sounds",
    exact: true,
  });
  await sound.click();
  await expect(sound).toHaveAttribute("aria-checked", "true");
  await page
    .getByRole("button", { name: "Reset panel position", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Back to access", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Unlock panel", exact: true }),
  ).toBeVisible();
});

test("opens guides and history and fits the screen", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.getByRole("button", { name: "Quick guide", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByText("Welcome aboard.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close dialog", exact: true }).click();
  await page.getByRole("button", { name: /View flight history, 1.32/ }).click();
  await expect(page.locator(".history-table")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("loads the exact requested URL as a background and returns to preview", async ({
  page,
}) => {
  // Keep this test deterministic; real embedding is checked separately against the live site.
  await page.route("https://hgnice.biz/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<html lang="en"><body>External website test</body></html>',
    }),
  );
  await page.getByRole("button", { name: "Live website", exact: true }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://hgnice.biz/#/register?invitationCode=531582188045",
  );
  await expect(
    page.frameLocator("iframe").getByText("External website test"),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Unlock panel", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Back to preview", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: "Aviator." })).toBeVisible();
});
