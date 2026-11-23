import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { SpellItem } from "./SpellItem.tsx";

test("кнопка вызывает onCast с заклинанием", async () => {
  const spark = { id: "spark", name: "Искра", cost: 5 };
  const onCast = vi.fn();
  render(<SpellItem spell={spark} canCast={true} onCast={onCast} />);

  await userEvent.click(screen.getByRole("button", { name: "Колдовать: Искра" }));

  expect(onCast).toHaveBeenCalledWith(spark);
});
