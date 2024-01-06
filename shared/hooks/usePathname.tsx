import { AnalyticsContent } from "@/components/analytics";
import { Documentations } from "@/components/documentations";
import { Expenses } from "@/components/expenses";

export function useGetPathname(selectedTab: any) {
  switch (selectedTab) {
    case "Analytics":
      return <AnalyticsContent />;
    case "Despesas":
      return <Expenses />;
    case "Documentação":
      return <Documentations />;
    default:
      return <AnalyticsContent />;
  }
}
