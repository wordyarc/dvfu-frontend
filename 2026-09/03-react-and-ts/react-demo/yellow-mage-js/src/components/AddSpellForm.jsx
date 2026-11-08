import { useState } from "react";

export default function AddSpellForm({ onAdd }) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("5");

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() === "") return;
    onAdd(name.trim(), Number(cost));
    setName("");
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Новое заклинание</h2>
      <div className="row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название"
        />
        <input
          type="number"
          min="1"
          required
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </div>
    </form>
  );
}
