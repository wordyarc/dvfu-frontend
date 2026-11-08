import { useState } from "react";
import AddSpellForm from "./components/AddSpellForm.tsx";
import MageCard from "./components/MageCard.tsx";
import SpellBook from "./components/SpellBook.tsx";
import type { Mage, Spell } from "./types.ts";

const mage: Mage = { name: "Жёлтый маг", hp: 24, maxHp: 30, maxMana: 20 };

const initialSpells: Spell[] = [
  { id: "spark", name: "Искра", cost: 5 },
  { id: "shield", name: "Щит", cost: 8 },
  { id: "ray", name: "Луч", cost: 12 },
];

export default function App() {
  const [mana, setMana] = useState(mage.maxMana);
  const [spells, setSpells] = useState(initialSpells);

  function handleCast(id: string) {
    const spell = spells.find((s) => s.id === id);
    if (spell === undefined) return;
    setMana(mana - spell.cost);
  }

  function handleRest() {
    setMana(mage.maxMana);
  }

  function handleAdd(name: string, cost: number) {
    setSpells([...spells, { id: crypto.randomUUID(), name, cost }]);
  }

  return (
    <main>
      <MageCard mage={mage} mana={mana} onRest={handleRest} />
      <SpellBook spells={spells} mana={mana} onCast={handleCast} />
      <AddSpellForm onAdd={handleAdd} />
    </main>
  );
}
