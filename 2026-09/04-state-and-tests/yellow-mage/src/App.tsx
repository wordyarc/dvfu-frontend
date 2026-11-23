import { useReducer, useState } from "react";
import { MageCard } from "./MageCard.tsx";
// import { ManaRegen } from "./ManaRegen.tsx";
import { SpellBook } from "./SpellBook.tsx";
import { initialState, reduce } from "./state.ts";
import { ThemeContext, type Theme } from "./theme.ts";

export function App() {
  const [state, dispatch] = useReducer(reduce, initialState);
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <main className={`app ${theme}`}>
        {/* <ManaRegen /> */}
        <MageCard mana={state.mana} log={state.log} onRest={() => dispatch({ type: "rest" })} />
        <SpellBook mana={state.mana} onCast={(spell) => dispatch({ type: "cast", spell })} />
      </main>
    </ThemeContext>
  );
}
