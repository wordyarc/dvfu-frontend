import { expect, test } from "vitest";
import { reduce } from "./state.ts";

const spark = { id: "spark", name: "Искра", cost: 5 };

test("заклинание тратит ману и пишет в журнал", () => {
  const next = reduce({ mana: 20, log: [] }, { type: "cast", spell: spark });

  expect(next).toEqual({ mana: 15, log: ["Колдует: Искра"] });
});

test("отдых восстанавливает ману", () => {
  const next = reduce({ mana: 2, log: [] }, { type: "rest" });

  expect(next).toEqual({ mana: 20, log: ["Отдыхает"] });
});
