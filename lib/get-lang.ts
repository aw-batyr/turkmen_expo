import { cookies } from "next/headers";

export const getLang = () => {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang")?.value || "ru";

  // Возвращаем полный объект языка
  return {
    title: langCookie === "en" ? "English" : "Русский",
    localization: langCookie,
  };
};
