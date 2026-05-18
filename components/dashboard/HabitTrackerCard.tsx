"use client";

import { useState } from "react";
import { Panel } from "./Panel";

const TODAY_IDX = 6;
const DAYS = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];

type Habit = {
  name: string;
  color: string;
  icon: React.ReactNode;
  initial: boolean[];
  streak: number;
};

function BookIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: 12, height: 12 }}><path d="M2 3 H7 Q8 3 8 4 V13 Q8 12 7 12 H2 Z M14 3 H9 Q8 3 8 4 V13 Q8 12 9 12 H14 Z" /></svg>;
}
function MountainIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: 12, height: 12 }}><path d="M1 13 L5 7 L8 11 L11 5 L15 13 Z" /></svg>;
}
function LotusIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ width: 12, height: 12 }}><path d="M8 4 Q5 7 4 11 Q8 12 12 11 Q11 7 8 4 Z M4 11 Q2 9 3 7 M12 11 Q14 9 13 7" /></svg>;
}
function LeafIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: 12, height: 12 }}><path d="M3 13 Q3 5 13 3 Q13 11 5 13 Z M3 13 L8 8" /></svg>;
}
function PenIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: 12, height: 12 }}><path d="M3 13 L11 5 L13 7 L5 15 Z M11 5 L12 4 Q13 3 14 4 Q15 5 14 6 L13 7" /></svg>;
}
function DropIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ width: 12, height: 12 }}><path d="M8 3 Q4 8 4 11 A4 4 0 0 0 12 11 Q12 8 8 3 Z" /></svg>;
}

const HABITS: Habit[] = [
  { name: "Czytanie 30m", color: "var(--color-a-dawn)",  icon: <BookIcon />,     initial: [true,true,true,true,true,true,false],  streak: 23 },
  { name: "Trening",      color: "var(--color-a-clay)",  icon: <MountainIcon />, initial: [true,false,true,true,false,true,false], streak: 4  },
  { name: "Medytacja",    color: "var(--color-a-lilac)", icon: <LotusIcon />,    initial: [true,true,true,true,true,true,true],   streak: 41 },
  { name: "Bez alkoholu", color: "var(--color-a-sage)",  icon: <LeafIcon />,     initial: [true,true,true,true,true,true,true],   streak: 18 },
  { name: "Dziennik",     color: "var(--color-a-mint)",  icon: <PenIcon />,      initial: [true,true,false,true,true,true,false], streak: 2  },
  { name: "10k kroków",   color: "var(--color-a-water)", icon: <DropIcon />,     initial: [true,true,true,false,true,true,false], streak: 9  },
];

export function HabitTrackerCard() {
  const [cells, setCells] = useState<boolean[][]>(() => HABITS.map((h) => [...h.initial]));

  function toggle(habitIdx: number, dayIdx: number) {
    setCells((prev) =>
      prev.map((row, hi) =>
        hi === habitIdx ? row.map((v, di) => (di === dayIdx ? !v : v)) : row,
      ),
    );
  }

  return (
    <Panel>
      <div className="card-head">
        <div className="card-title">
          <span className="swatch" style={{ background: "var(--color-a-dawn)" }} />
          Nawyki
        </div>
        <div className="card-meta mono">TYDZ. 20 · 78% UKOŃCZONE</div>
      </div>

      {/* Header row */}
      <div className="habit-head">
        <div />
        {DAYS.map((d, i) => (
          <div key={d} style={{ textAlign: "center", color: i === TODAY_IDX ? "var(--color-a-water)" : undefined }}>
            {d}
          </div>
        ))}
        <div style={{ textAlign: "right" }}>Seria</div>
      </div>

      {/* Habit rows */}
      {HABITS.map((h, hi) => (
        <div key={h.name} className="habit-row">
          <div className="habit-name">
            <div className="habit-icon" style={{ background: h.color }}>
              {h.icon}
            </div>
            {h.name}
          </div>
          {cells[hi].map((done, di) => (
            <button
              key={di}
              className={`habit-cell${done ? " done" : " miss"}${di === TODAY_IDX ? " today" : ""}`}
              style={done ? { background: h.color } : undefined}
              onClick={() => toggle(hi, di)}
              aria-label={`${h.name} ${DAYS[di]}: ${done ? "ukończone" : "pominięte"}`}
            />
          ))}
          <div className="habit-streak mono">
            {h.streak}<small>d</small>
          </div>
        </div>
      ))}
    </Panel>
  );
}
