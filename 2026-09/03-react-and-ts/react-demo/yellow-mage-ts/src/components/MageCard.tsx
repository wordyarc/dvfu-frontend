import type { Mage } from "../types.ts";
import StatBar from "./StatBar.tsx";

type MageCardProps = {
  mage: Mage;
  mana: number;
  onRest: () => void;
};

export default function MageCard({ mage, mana, onRest }: MageCardProps) {
  return (
    <section className="card">
      <h1>{mage.name}</h1>
      <StatBar label="HP" value={mage.hp} max={mage.maxHp} />
      <StatBar label="Мана" value={mana} max={mage.maxMana} />
      <button onClick={onRest}>Отдохнуть</button>
    </section>
  );
}
