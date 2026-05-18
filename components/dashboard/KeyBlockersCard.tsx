import { Panel } from "./Panel";

const BLOCKERS = [
  {
    level: "",
    title: "Odnowienie wizy — brak listu od pracodawcy",
    sub: "Właściciel: Ty · pilne",
    age: "6d",
  },
  {
    level: "med",
    title: "Oczekiwanie na review designu — landing v4",
    sub: "Właściciel: Priya · ping 2h temu",
    age: "2d",
  },
  {
    level: "low",
    title: "Notariusz do umowy najmu",
    sub: "Właściciel: Ty · niski priorytet",
    age: "1d",
  },
];

export function KeyBlockersCard() {
  return (
    <Panel>
      <div className="card-head">
        <div className="card-title">
          <span className="swatch" style={{ background: "var(--color-a-clay)" }} />
          Blokady
        </div>
        <div className="card-meta mono">3 OTWARTE</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {BLOCKERS.map((b) => (
          <div key={b.title} className={`block${b.level ? ` ${b.level}` : ""}`}>
            <div className="sev" />
            <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
              <div className="ttl">{b.title}</div>
              <div className="sub">{b.sub}</div>
            </div>
            <div className="age mono">{b.age}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
