import { Panel } from "./Panel";

export function FinancePulseCard() {
  return (
    <Panel>
      <div className="card-head">
        <div className="card-title">
          <span className="swatch" style={{ background: "var(--color-a-sage)" }} />
          Puls finansów
        </div>
        <div className="card-meta mono">MAJ · TYDZ. 3</div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
        <div className="mono" style={{ fontSize: 30, letterSpacing: "-0.01em", fontWeight: 500 }}>
          48 210 zł
        </div>
        <div className="fin-delta mono">+ 4,2%</div>
      </div>
      <div style={{ fontSize: 11, color: "var(--color-ink-2)", letterSpacing: "0.04em", marginBottom: 14 }}>
        Środki płynne na 4 kontach
      </div>

      <svg height="60" style={{ display: "block", width: "100%" }} viewBox="0 0 280 60" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.80 0.10 155)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="oklch(0.80 0.10 155)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="50" x2="280" y2="50" stroke="oklch(1 0 0 / 0.05)" strokeDasharray="2 4" />
        <path
          d="M0,44 C 18,40 30,42 48,34 S 80,38 100,28 S 140,20 160,24 S 200,16 220,12 S 260,10 280,14 L280,60 L0,60 Z"
          fill="url(#sparkFill)"
        />
        <path
          d="M0,44 C 18,40 30,42 48,34 S 80,38 100,28 S 140,20 160,24 S 200,16 220,12 S 260,10 280,14"
          fill="none"
          stroke="oklch(0.80 0.10 155)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="280" cy="14" r="3" fill="oklch(0.80 0.10 155)" />
        <circle cx="280" cy="14" r="7" fill="oklch(0.80 0.10 155)" opacity="0.22" />
      </svg>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 10px" }}>
        <div className="fin-row">
          <div className="k">Wydatki / mc</div>
          <div className="v mono">6 840 zł</div>
        </div>
        <div className="fin-row">
          <div className="k">Rezerwa</div>
          <div className="v mono">7,1<small>mc</small></div>
        </div>
        <div className="fin-row">
          <div className="k">Oszczędności</div>
          <div className="v mono">11 420 zł</div>
        </div>
        <div className="fin-row">
          <div className="k">Subskrypcje</div>
          <div className="v mono">312 zł<small>/mc</small></div>
        </div>
      </div>
    </Panel>
  );
}
