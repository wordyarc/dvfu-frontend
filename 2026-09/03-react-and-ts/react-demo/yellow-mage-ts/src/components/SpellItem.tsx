import type { Spell } from "../types.ts";

type SpellItemProps = {
  spell: Spell;
  canCast: boolean;
  onCast: (id: string) => void;
};

export default function SpellItem({ spell, canCast, onCast }: SpellItemProps) {
  return (
    <li>
      <span>
        {spell.name} — {spell.cost} маны
      </span>
      <button onClick={() => onCast(spell.id)} disabled={!canCast}>
        Колдовать
      </button>
    </li>
  );
}
