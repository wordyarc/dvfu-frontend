import type { Spell } from "./api.ts";

type Props = { spell: Spell; canCast: boolean; onCast: (spell: Spell) => void };

export function SpellItem({ spell, canCast, onCast }: Props) {
  return (
    <li className="row">
      {`${spell.name} — ${spell.cost} маны`}
      <button
        type="button"
        aria-label={`Колдовать: ${spell.name}`}
        disabled={!canCast}
        onClick={() => onCast(spell)}
      >
        Колдовать
      </button>
    </li>
  );
}
