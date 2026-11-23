import { useEffect, useState } from "react";

export function ManaRegen() {
  const [mana, setMana] = useState(0);

  useEffect(() => {
    console.log("таймер запущен");
    const id = setInterval(() => {
      setMana((m) => Math.min(m + 1, 20));
    }, 1000);
    return () => {
      console.log("таймер остановлен");
      clearInterval(id);
    };
  }, []);

  return <p className="panel wide">Таймер маны: {mana}</p>;
}
