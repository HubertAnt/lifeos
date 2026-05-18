"use client";

import { useState } from "react";
import { Panel } from "./Panel";

type Priority = {
  label: string;
  sub: string;
  chip: "high" | "med" | "low";
  chipLabel: string;
  when: string;
};

const INITIAL: Priority[] = [
  { label: "Sfinalizuj strategię na Q3",       sub: "Przegląd z Markiem do końca dnia",  chip: "high", chipLabel: "WYSOKI", when: "11:30"  },
  { label: "Odpowiedz Lenie ws. partnerstwa",  sub: "Szkic w kolejce Operatora",          chip: "high", chipLabel: "WYSOKI", when: "teraz"  },
  { label: "Wyślij list o przedłużenie wizy",  sub: "Blokuje · 6 dni otwarte",            chip: "high", chipLabel: "WYSOKI", when: "dziś"   },
  { label: "Trening — push",                   sub: "Blok: 17:00–17:45",                  chip: "med",  chipLabel: "ŚREDNI", when: "17:00"  },
  { label: "Czytanie 30 min — Annie Duke",     sub: "Rozdziały 3–4",                      chip: "low",  chipLabel: "NISKI",  when: "wieczór" },
];

export function PrioritiesCard() {
  const [done, setDone] = useState<boolean[]>([false, false, false, false, true]);

  function toggle(i: number) {
    setDone((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <Panel>
      <div className="card-head">
        <div className="card-title">
          <span className="swatch" style={{ background: "var(--color-a-peach)" }} />
          Priorytety
        </div>
        <div className="card-meta mono">DZIŚ · 5 ZADAŃ</div>
      </div>

      <div>
        {INITIAL.map((p, i) => (
          <div
            key={p.label}
            className={`pri${done[i] ? " done" : ""}`}
            onClick={() => toggle(i)}
          >
            <div className="check">
              <svg viewBox="0 0 12 12" fill="none">
                <path d="M2 6.5 L5 9 L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={`pri-label`}>
              {p.label}
              <span className="pri-sub">{p.sub}</span>
            </div>
            <div className={`chip ${p.chip}`}>{p.chipLabel}</div>
            <div className="pri-when mono">{p.when}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
