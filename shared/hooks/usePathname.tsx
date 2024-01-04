import { AnalyticsContent } from "@/components/analytics";

export function useGetPathname(selectedTab: any) {
    switch (selectedTab) {
      case "Analytics":
        return <AnalyticsContent />;
      case "Despesas":
        return "lixo";
      default:
        return <div>Conteúdo padrão ou mensagem de erro</div>;
    }
  }