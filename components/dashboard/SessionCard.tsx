"use client";

import { useEffect, useRef, useState } from "react";
import { Panel } from "./Panel";

const TOTAL = 25 * 60;
const C = 2 * Math.PI * 44;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SessionCard() {
  const [remaining, setRemaining] = useState(23 * 60 + 14);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const elapsedPct = 1 - remaining / TOTAL;
  const dashOffset = C * (1 - elapsedPct);
  const focusPct = Math.round(elapsedPct * 100);

  return (
    <Panel className="panel-session">
      <div className="card-head">
        <div className="card-title">
          <span className="swatch" style={{ background: "var(--color-a-water)" }} />
          Sesja
        </div>
        <div className="card-meta mono">GŁĘBOKA PRACA · BLOK 02</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 22, alignItems: "center" }}>
        {/* Ring */}
        <div style={{ position: "relative", aspectRatio: "1", maxWidth: 230, margin: "4px auto 0" }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.84 0.09 175)" />
                <stop offset="100%" stopColor="oklch(0.62 0.12 215)" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="36" fill="none" stroke="oklch(1 0 0 / 0.04)" strokeWidth="1" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C.toFixed(2)}
              strokeDashoffset={dashOffset.toFixed(2)}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <div className="mono" style={{ fontSize: 38, letterSpacing: "-0.02em", fontWeight: 400 }}>
              {pad(mins)}:<span style={{ color: "var(--color-ink-2)", fontSize: 22 }}>{pad(secs)}</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--color-ink-3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              SKUPIENIE · {focusPct}%
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: "var(--color-ink-3)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>
              Pracujesz nad
            </div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.2, fontStyle: "italic" }}>
              Szkic strategii na Q3
            </div>
            <div style={{ fontSize: 12, color: "var(--color-ink-2)", marginTop: 4 }}>
              Tag: <span className="mono" style={{ color: "var(--color-ink-1)" }}>#strategia</span> · 3 z 5 pomodoro
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <div className="ses-stat"><div className="k">Dziś</div><div className="v mono">2g 12m</div></div>
            <div className="ses-stat"><div className="k">Seria</div><div className="v mono">11 dni</div></div>
            <div className="ses-stat"><div className="k">Skupienie</div><div className="v mono">82</div></div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button className="btn primary" onClick={() => setRunning((r) => !r)}>
              {running ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <rect x="1" y="1" width="3" height="8" /><rect x="6" y="1" width="3" height="8" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2 1 L9 5 L2 9 Z" />
                </svg>
              )}
              {running ? "Pauza" : "Wznów"}
            </button>
            <button className="btn">Pomiń</button>
            <button className="btn">Zakończ</button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
