import { use } from "react";
import { MAX_MANA } from "./state.ts";
import { ThemeContext } from "./theme.ts";

type Props = { mana: number; log: string[]; onRest: () => void };

export function MageCard({ mana, log, onRest }: Props) {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <section className="panel">
      <header className="row">
        <h2>Жёлтый маг</h2>
        <button type="button" onClick={toggleTheme}>
          {theme === "light" ? "Тёмная тема" : "Светлая тема"}
        </button>
      </header>
      <p className="mana">
        Мана: {mana} / {MAX_MANA}
      </p>
      {mana < 5 && <p className="warn">Мало маны</p>}
      <button type="button" onClick={onRest} disabled={mana === MAX_MANA}>
        Отдохнуть
      </button>
      <ol>
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ol>
    </section>
  );
}
