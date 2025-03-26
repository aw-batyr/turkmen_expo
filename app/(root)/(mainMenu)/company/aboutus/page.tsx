import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { getAbout } from "@/services/about";
import { cookies } from "next/headers";

export default async function AboutPage() {
  const lang = cookies().get("lang")?.value ?? "ru";

  const data = await getAbout(lang);

  const aboutText = lang === "en" ? "About us" : "Коротко о нас";

  return (
    <LayoutWithSidebar second={aboutText} title={aboutText}>
      <div
        dangerouslySetInnerHTML={{
          __html: data,
        }}
        className="text-[16px] aboutus  text-p flex flex-col items-start gap-6 leading-[150%] pb-10"
      />
    </LayoutWithSidebar>
  );
}
