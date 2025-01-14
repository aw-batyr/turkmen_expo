import { useSearchParams } from "next/navigation";

export const getLangFromUrl = (href: string) => {
  const searchParams = useSearchParams();

  return searchParams.get("lang");
};
