import { useUserProfile } from "@/services/user/get-user-profile";

export const useUserID = () => {
  const user = useUserProfile("65b6afce5072b89f5b86afd2");
  return { user };
};
