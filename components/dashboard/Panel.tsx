import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className }: PanelProps) {
  return <div className={cn("panel", className)}>{children}</div>;
}
