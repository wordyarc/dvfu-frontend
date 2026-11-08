import StatBar from "./StatBar.jsx";

export default function MageCard({ mage, mana, onRest }) {
  return (
    <section className="card">
      <h1>{mage.name}</h1>
      <StatBar label="HP" value={mage.hp} max={mage.maxHp} />
      <StatBar label="Мана" value={mana} max={mage.maxMana} />
      <button onClick={onRest}>Отдохнуть</button>
    </section>
  );
}
