import { expect, test } from "@playwright/test";

test("маг колдует и отдыхает", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Колдовать: Метеор" }).click();
  await page.getByRole("button", { name: "Колдовать: Искра" }).click();
  await expect(page.getByText("Мана: 0 / 20")).toBeVisible();
  await expect(page.getByText("Мало маны")).toBeVisible();

  await page.getByRole("button", { name: "Отдохнуть" }).click();
  await expect(page.getByText("Мана: 20 / 20")).toBeVisible();
});
