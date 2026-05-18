"use client";

import { useEffect, useState } from "react";

const TABS = ["Główna", "CRM", "Umysł", "Finanse", "Dziennik", "Zdrowie"];
const DAYS = ["nd", "pon", "wt", "śr", "czw", "pt", "sob"];
const MONTHS = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function TopRail() {
  const [active, setActive] = useState(0);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
      setDate(
        `${DAYS[now.getDay()]} · ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()} · Warszawa`,
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="rail">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true" />
        <div className="brand-name">
          Life<span>OS</span>
        </div>
        <div className="pill-dot" style={{ marginLeft: 10 }}>
          wszystko działa spokojnie
        </div>
      </div>

      <nav className="tabs" aria-label="Sekcje">
        {TABS.map((label, i) => (
          <button
            key={label}
            className={`tab${active === i ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="rail-right">
        <div className="clock">
          <div className="t mono">{time}</div>
          <div className="d">{date}</div>
        </div>
        <div className="avatar" aria-label="Profil">AM</div>
      </div>
    </header>
  );
}
