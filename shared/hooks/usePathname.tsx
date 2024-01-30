import { Admin } from "@/components/admin";
import { GeralConfig } from "@/components/admin/geral/geral";
import { AnalyticsContent } from "@/components/analytics";
import { Documentations } from "@/components/documentations";
import { Expenses } from "@/components/expenses";
import { Plans } from "@/components/plans/plans";

export function useGetPathname(selectedTab: any) {
  switch (selectedTab) {
    case "Analytics":
      return <AnalyticsContent />;
    case "Despesas":
      return <Expenses />;
    case "Documentação":
      return <Documentations />;
    case "Administrador":
      return <Admin />;
      case "Planos":
        return <Admin />;
    default:
      return <AnalyticsContent />;
  }
}

export function useGetPathnameAdminConfig(selectedTabConfig: any) {
  switch (selectedTabConfig) {
    case "Geral":
      return <GeralConfig />;
      case "Planos":
        return <Plans />;
  }
}
