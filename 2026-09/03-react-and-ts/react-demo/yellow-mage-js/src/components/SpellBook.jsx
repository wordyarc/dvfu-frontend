import { useState } from "react";
import SpellItem from "./SpellItem.jsx";

export default function SpellBook({ spells, mana, onCast }) {
  const [query, setQuery] = useState("");

  const visible = spells.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="card">
      <h2>Книга заклинаний</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Найти заклинание"
      />
      {visible.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        <ul>
          {visible.map((spell) => (
            <SpellItem
              key={spell.id}
              spell={spell}
              canCast={spell.cost <= mana}
              onCast={onCast}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
