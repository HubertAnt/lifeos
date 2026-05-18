import { Shell } from "@/components/dashboard/Shell";
import { TopRail } from "@/components/dashboard/TopRail";
import { OperatorCard } from "@/components/dashboard/OperatorCard";
import { FinancePulseCard } from "@/components/dashboard/FinancePulseCard";
import { KeyBlockersCard } from "@/components/dashboard/KeyBlockersCard";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { HabitTrackerCard } from "@/components/dashboard/HabitTrackerCard";
import { PrioritiesCard } from "@/components/dashboard/PrioritiesCard";
import { NutritionCard } from "@/components/dashboard/NutritionCard";

export default function DashboardPage() {
  return (
    <Shell>
      <TopRail />

      <main className="dashboard-grid">
        <div className="dash-col">
          <OperatorCard />
          <FinancePulseCard />
          <KeyBlockersCard />
        </div>
        <div className="dash-col">
          <SessionCard />
          <HabitTrackerCard />
          <PrioritiesCard />
        </div>
        <div className="dash-col">
          <NutritionCard />
        </div>
      </main>

      <footer className="foothint">
        <div>
          Szybka zmiana: <span className="kbd">⌘ K</span> · Nowa myśl:{" "}
          <span className="kbd">⌘ N</span>
        </div>
        <div>Ostatnia synchr. · 10:41 · Notion, Linear, Plaid, Whoop</div>
      </footer>
    </Shell>
  );
}
