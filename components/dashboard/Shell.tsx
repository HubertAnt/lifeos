import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: "18px 22px 26px" }}>
      <div className="aurora" aria-hidden="true" />
      <div className="topo" aria-hidden="true" />
      {children}
    </div>
  );
}
