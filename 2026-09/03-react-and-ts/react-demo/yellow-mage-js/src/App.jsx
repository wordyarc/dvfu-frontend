import { useState } from "react";
import AddSpellForm from "./components/AddSpellForm.jsx";
import MageCard from "./components/MageCard.jsx";
import SpellBook from "./components/SpellBook.jsx";

const mage = { name: "Жёлтый маг", hp: 24, maxHp: 30, maxMana: 20 };

const initialSpells = [
  { id: "spark", name: "Искра", cost: 5 },
  { id: "shield", name: "Щит", cost: 8 },
  { id: "ray", name: "Луч", cost: 12 },
];

export default function App() {
  const [mana, setMana] = useState(mage.maxMana);
  const [spells, setSpells] = useState(initialSpells);

  function handleCast(id) {
    const spell = spells.find((s) => s.id === id);
    setMana(mana - spell.cost);
  }

  function handleRest() {
    setMana(mage.maxMana);
  }

  function handleAdd(name, cost) {
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
