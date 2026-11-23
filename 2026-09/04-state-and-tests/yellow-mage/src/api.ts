export type Spell = { id: string; name: string; cost: number };

export function isSpell(value: unknown): value is Spell {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "cost" in value &&
    typeof value.cost === "number"
  );
}

export async function loadSpells(query: string, signal: AbortSignal): Promise<Spell[]> {
  const url = `/api/spells?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data: unknown = await res.json();
  if (!Array.isArray(data) || !data.every(isSpell)) {
    throw new Error("Неверный ответ сервера");
  }
  return data;
}
