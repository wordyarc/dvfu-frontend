import { createServer } from "node:http";

const spells = [
  { id: "spark", name: "Искра", cost: 5 },
  { id: "meteor", name: "Метеор", cost: 15 },
  { id: "light-ray", name: "Луч света", cost: 8 },
  { id: "ice-ray", name: "Ледяной луч", cost: 10 },
  { id: "penumbra", name: "Полутень", cost: 6 },
  { id: "heal", name: "Исцеление", cost: 12 },
];

createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname !== "/api/spells") return res.writeHead(404).end();

  const q = (url.searchParams.get("q") ?? "").toLowerCase();
  const found = spells.filter((s) => s.name.toLowerCase().includes(q));
  const delay = q.length === 1 || q.length === 2 ? 2000 : 300;
  console.log(`→ «${q}»  ответим через ${delay} мс`);

  const timer = setTimeout(() => {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(found));
    console.log(`← «${q}»  ${found.length} шт.`);
  }, delay);

  res.on("close", () => {
    if (res.writableFinished) return;
    clearTimeout(timer);
    console.log(`✕ «${q}»  запрос отменён`);
  });
}).listen(8080, () => console.log("API: http://localhost:8080/api/spells"));
