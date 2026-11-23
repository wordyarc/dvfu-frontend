import { useState } from "react";
import type { Spell } from "./api.ts";
import { SpellItem } from "./SpellItem.tsx";
import { useSpells, type Load } from "./useSpells.ts";

type Props = { mana: number; onCast: (spell: Spell) => void };

export function SpellBook({ mana, onCast }: Props) {
  const [query, setQuery] = useState("");
  const load = useSpells(query);

  return (
    <section className="panel">
      <h2>Книга заклинаний</h2>
      <label className="search">
        Поиск
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Content load={load} mana={mana} onCast={onCast} />
    </section>
  );
}

function Content({ load, mana, onCast }: Props & { load: Load }) {
  if (load.status === "loading") return <p>Загружаем книгу…</p>;
  if (load.status === "error") return <p role="alert">Не удалось загрузить книгу: {load.message}</p>;
  if (load.spells.length === 0) return <p>Ничего не нашлось</p>;

  return (
    <ul>
      {load.spells.map((spell) => (
        <SpellItem key={spell.id} spell={spell} canCast={spell.cost <= mana} onCast={onCast} />
      ))}
    </ul>
  );
}
