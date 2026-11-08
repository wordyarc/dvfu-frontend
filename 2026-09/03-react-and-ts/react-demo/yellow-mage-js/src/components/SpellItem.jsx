export default function SpellItem({ spell, canCast, onCast }) {
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
