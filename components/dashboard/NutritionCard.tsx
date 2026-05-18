"use client";

import { useState } from "react";
import { Panel } from "./Panel";

const MACROS = [
  { label: "Białko",   val: "112", target: "160 g", pct: 70,  color: "var(--color-a-clay)"  },
  { label: "Węglow.",  val: "148", target: "220 g", pct: 67,  color: "var(--color-a-dawn)"  },
  { label: "Tłuszcze", val: "52",  target: "75 g",  pct: 69,  color: "var(--color-a-lilac)" },
  { label: "Błonnik",  val: "22",  target: "35 g",  pct: 63,  color: "var(--color-a-sage)"  },
];

const MEALS = [
  { time: "08:14", name: "Jogurt grecki z owocami leśnymi", detail: "owies, migdały, miód",      kcal: "410",  planned: false },
  { time: "12:38", name: "Miska z kurczakiem",              detail: "komosa, awokado, jarmuż",   kcal: "680",  planned: false },
  { time: "15:50", name: "Jabłko z masłem orzechowym",      detail: "przekąska",                 kcal: "330",  planned: false },
  { time: "19:30", name: "Łosoś z batatem",                 detail: "planowane",                 kcal: "~620", planned: true  },
];

export function NutritionCard() {
  const [water, setWater] = useState(5);

  function toggleWater(idx: number) {
    setWater((prev) => {
      // Click filled → unfill from this point; click empty → fill up to this point
      return idx < prev ? idx : idx + 1;
    });
  }

  return (
    <Panel>
      {/* decorative droplet */}
      <svg
        style={{ position: "absolute", right: -30, top: -30, width: 180, height: 180, opacity: 0.14, pointerEvents: "none" }}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path d="M50 6 C 30 30, 20 50, 28 70 C 36 86, 64 86, 72 70 C 80 50, 70 30, 50 6 Z" fill="none" stroke="oklch(0.84 0.09 175)" strokeWidth="0.8" />
        <path d="M50 16 C 36 36, 30 50, 36 66" fill="none" stroke="oklch(0.84 0.09 175)" strokeWidth="0.5" />
      </svg>

      <div className="card-head">
        <div className="card-title">
          <span className="swatch" style={{ background: "var(--color-a-mint)" }} />
          Odżywianie
        </div>
        <div className="card-meta mono">DZIEŃ 138</div>
      </div>

      {/* Calorie summary */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <div>
          <div className="mono" style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.01em" }}>
            1 420<small style={{ fontSize: 12, color: "var(--color-ink-2)", marginLeft: 6 }}>/ 2 200 kcal</small>
          </div>
          <div style={{ fontSize: 11, color: "var(--color-ink-2)", letterSpacing: "0.04em", marginTop: 2 }}>
            Pozostało 780 kcal
          </div>
        </div>
      </div>

      {/* Macros */}
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {MACROS.map((m) => (
          <div key={m.label} className="macro">
            <div className="lbl">{m.label}</div>
            <div className="val mono">{m.val}<small>/{m.target}</small></div>
            <div className="bar">
              <i style={{ width: `${m.pct}%`, background: m.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Water tracker */}
      <div className="water-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "var(--color-ink-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Woda</div>
          <div className="mono" style={{ fontSize: 12, color: "var(--color-ink-1)" }}>{water} / 8 szklanek</div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <button
              key={i}
              className={`water-cell${i < water ? " full" : ""}`}
              onClick={() => toggleWater(i)}
              aria-label={`Szklanka ${i + 1}: ${i < water ? "wypita" : "nie wypita"}`}
            />
          ))}
        </div>
        <div className="wave" aria-hidden="true">
          <svg viewBox="0 0 600 14" preserveAspectRatio="none">
            <path d="M0 7 Q 50 0 100 7 T 200 7 T 300 7 T 400 7 T 500 7 T 600 7 L 600 14 L 0 14 Z" fill="oklch(0.78 0.10 215 / 0.25)" />
            <path d="M0 9 Q 50 14 100 9 T 200 9 T 300 9 T 400 9 T 500 9 T 600 9 L 600 14 L 0 14 Z" fill="oklch(0.78 0.10 215 / 0.18)" />
          </svg>
        </div>
      </div>

      {/* Meals */}
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
        {MEALS.map((m) => (
          <div key={m.time} className={`meal${m.planned ? " planned" : ""}`}>
            <div className="when mono">{m.time}</div>
            <div className="name">
              {m.name}
              <small>{m.detail}</small>
            </div>
            <div className="kcal mono">{m.kcal}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
