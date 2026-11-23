import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import { App } from "./App.tsx";

const spells = [
  { id: "spark", name: "Искра", cost: 5 },
  { id: "meteor", name: "Метеор", cost: 15 },
];

afterEach(() => vi.unstubAllGlobals());

test("заклинание из книги тратит ману в карточке", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(spells))));
  render(<App />);

  await userEvent.click(await screen.findByRole("button", { name: "Колдовать: Метеор" }));

  expect(screen.getByText("Мана: 5 / 20")).toBeInTheDocument();
  expect(screen.getByText("Колдует: Метеор")).toBeInTheDocument();
});
