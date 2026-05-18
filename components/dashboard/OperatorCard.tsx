import { Panel } from "./Panel";

export function OperatorCard() {
  return (
    <Panel className="panel-operator">
      {/* decorative leaf */}
      <svg
        style={{ position: "absolute", right: -20, top: -20, width: 140, height: 140, opacity: 0.18, pointerEvents: "none" }}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path d="M50 8 C 25 22, 18 50, 30 78 C 42 70, 58 70, 70 78 C 82 50, 75 22, 50 8 Z" fill="none" stroke="oklch(0.78 0.10 295)" strokeWidth="0.8" />
        <path d="M50 14 L 50 78" stroke="oklch(0.78 0.10 295)" strokeWidth="0.6" />
        <path d="M50 30 Q 38 36 32 50 M50 30 Q 62 36 68 50 M50 46 Q 40 52 36 64 M50 46 Q 60 52 64 64" stroke="oklch(0.78 0.10 295)" strokeWidth="0.5" fill="none" />
      </svg>

      <div className="card-head">
        <div className="card-title">
          <span className="swatch" style={{ background: "var(--color-a-lilac)" }} />
          Operator
        </div>
        <div className="card-meta mono">v3.2 · gpt-4o</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, position: "relative", zIndex: 1 }}>
        <div className="op-orb" />
        <div style={{ fontSize: 14 }}>
          <div style={{ color: "var(--color-ink-2)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Aktualnie
          </div>
          <div>
            Tworzy odpowiedź do{" "}
            <em style={{ color: "var(--color-ink-0)", fontStyle: "normal" }}>Leny Park</em>
          </div>
        </div>
      </div>

      <div className="op-line done">
        <span className="dot" />
        Przejrzano 14 wiadomości
        <span className="tag mono">2m</span>
      </div>
      <div className="op-line">
        <span className="dot" />
        Streszcza notatki ze standupu
        <span className="tag mono">teraz</span>
      </div>
      <div className="op-line queue">
        <span className="dot" />
        Umów lunch z Jamie
        <span className="tag mono">kolejka</span>
      </div>
      <div className="op-line queue">
        <span className="dot" />
        Pobierz raport wydatków Q2
        <span className="tag mono">kolejka</span>
      </div>

      <div className="op-prompt">
        <span style={{ color: "var(--color-a-lilac)", fontSize: 12 }}>✺</span>
        <span>Zapytaj o cokolwiek lub zleć zadanie</span>
        <div className="op-caret" />
      </div>
    </Panel>
  );
}
