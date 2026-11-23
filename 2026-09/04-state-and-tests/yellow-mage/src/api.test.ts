import { afterEach, expect, test, vi } from "vitest";
import { loadSpells } from "./api.ts";

afterEach(() => vi.unstubAllGlobals());

test("ответ 500 — ошибка с кодом", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 500 })));

  await expect(loadSpells("", new AbortController().signal)).rejects.toThrow("HTTP 500");
});
