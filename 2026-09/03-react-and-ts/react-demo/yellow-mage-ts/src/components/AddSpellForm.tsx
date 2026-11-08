import { useState } from "react";
import type { SubmitEvent } from "react";

type AddSpellFormProps = {
  onAdd: (name: string, cost: number) => void;
};

export default function AddSpellForm({ onAdd }: AddSpellFormProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("5");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
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
