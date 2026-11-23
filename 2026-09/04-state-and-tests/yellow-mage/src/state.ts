import type { Spell } from "./api.ts";

export const MAX_MANA = 20;

export type State = { mana: number; log: string[] };

export type Action = { type: "cast"; spell: Spell } | { type: "rest" };

export const initialState: State = { mana: MAX_MANA, log: [] };

export function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "cast":
      if (action.spell.cost > state.mana) return state;
      return {
        mana: state.mana,
        log: [...state.log, `Колдует: ${action.spell.name}`],
      };
    case "rest":
      return { mana: MAX_MANA, log: [...state.log, "Отдыхает"] };
  }
}
