import { useEffect, useState } from "react";
import { loadSpells, type Spell } from "./api.ts";

export type Load =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; spells: Spell[] };

export function useSpells(query: string): Load {
  const [load, setLoad] = useState<Load>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    loadSpells(query, controller.signal)
      .then((spells) => setLoad({ status: "ready", spells }))
      .catch((error) => {
        if (controller.signal.aborted) return;
        setLoad({ status: "error", message: error.message });
      });
    return () => controller.abort();
  }, [query]);

  return load;
}
